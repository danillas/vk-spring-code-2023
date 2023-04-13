import { EventEmitter } from 'src/tools/eventEmitter';
import {
  StorageMethods,
  StorageChangeListener,
  StorageParams,
  StorageState,
  StorageValidator,
  StorageErrorHandlingMode,
} from './types';
import { isEqual } from '@vkontakte/vkjs';

export class Storage<T extends StorageState> {
  private state: T;
  private readonly emitter = new EventEmitter<{ change: StorageChangeListener<T> }>();

  private readonly initialState: Readonly<T>;
  private readonly methods: StorageMethods<T>;
  private readonly validator: StorageValidator<T>;
  private readonly errorHandlingMode: StorageErrorHandlingMode;

  constructor(params: StorageParams<T>) {
    this.state = { ...params.initialState };
    this.initialState = params.initialState;
    this.methods = params.methods;
    this.validator = params.validator || {};
    this.errorHandlingMode = params.errorHandlingMode || StorageErrorHandlingMode.Rollback;
  }

  private validateField<K extends keyof T>(key: K, value: T[K]): boolean {
    return this.validator[key] ? (this.validator[key] as any)(value) : true;
  }

  private setState(state: Partial<T>) {
    this.state = { ...this.state, ...state };
    this.emitter.emit('change', { ...this.state });
  }

  private errorHandler(error: Error, prevState: Partial<T> = this.initialState) {
    switch (this.errorHandlingMode) {
      case StorageErrorHandlingMode.Rollback:
        return this.setState({ ...prevState });
      case StorageErrorHandlingMode.Throw:
        throw error;
      case StorageErrorHandlingMode.Ignore:
      default:
        return void 0;
    }
  }

  /**
   * Синхронизация локального хранилища с удалённым
   *
   * В случае ошибки - выполняется одно из действий, определённых параметром
   * {@link errorHandlingMode} при инициализации модуля.
   */
  sync(): Promise<T> {
    const validatedPairs = {} as T;

    this.setState(this.initialState);

    return this.methods.get(Object.keys(this.state)).then((keys) => {
      keys.forEach(({ key, value }) => {
        this.validateField(key, value) && (validatedPairs[key as keyof T] = value);
      });

      this.setState({ ...this.state, ...validatedPairs });

      return this.getAll();
    });
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  getAll(): Readonly<T> {
    return this.state;
  }

  /**
   * Запись ключа
   *
   * @return В случае успешной записи - актуальное локальное состояние
   * обновляется значением принятым на вход.
   *
   * В случае ошибки - выполняется одно из действий, определённых параметром
   * {@link errorHandlingMode} при инициализации модуля.
   */
  async set<K extends keyof T>(key: K, value: T[K]): Promise<void> {
    if (!this.validateField(key, value)) {
      value = this.initialState[key];
    }

    const prevValue = this.state[key];

    if (isEqual(prevValue, value)) {
      return;
    }

    if (this.errorHandlingMode === StorageErrorHandlingMode.Rollback) {
      this.setState({ [key]: value } as unknown as Partial<T>);
    }

    return this.methods
      .set([{ key, value }])
      .then(() =>
        this.errorHandlingMode !== StorageErrorHandlingMode.Rollback
          ? this.setState({ [key]: value } as unknown as Partial<T>)
          : void 0,
      )
      .catch((error) => {
        this.errorHandler(error, { [key]: prevValue } as unknown as Partial<T>);
      });
  }

  /**
   * Сброс к значению по умолчанию.
   *
   * @param key - ключ, который необходимо сбросить
   *
   * В случае ошибки - выполняется одно из действий, определённых параметром
   * {@link errorHandlingMode} при инициализации модуля.
   */
  async reset<K extends keyof T>(key: K): Promise<void> {
    const prevValue = this.state[key];

    if (this.errorHandlingMode === StorageErrorHandlingMode.Rollback) {
      this.setState({ [key]: this.initialState[key] } as unknown as Partial<T>);
    }

    await this.methods
      .reset([key])
      .then(() =>
        this.errorHandlingMode !== StorageErrorHandlingMode.Rollback
          ? this.setState({ [key]: this.initialState[key] } as unknown as Partial<T>)
          : void 0,
      )
      .catch((error) => {
        this.errorHandler(error, { [key]: prevValue } as unknown as Partial<T>);
      });
  }

  /**
   * Сброс всех ключей к значениям по умолчанию.
   */
  async resetAll<K extends keyof T>(): Promise<void> {
    let resettedPairs = {} as T;
    const stateKeys = Object.keys(this.initialState) as K[];
    const prevState = this.state;

    if (this.errorHandlingMode === StorageErrorHandlingMode.Rollback) {
      resettedPairs = { ...this.initialState };
      this.setState(resettedPairs);
    }

    const resettedKeys = await this.methods.reset(stateKeys);
    resettedPairs = {} as T;
    resettedKeys.forEach((key) => (resettedPairs[key] = this.initialState[key]));
    this.setState({ ...prevState, ...resettedPairs });
  }

  public on = this.emitter.on;
  public off = this.emitter.off;
}
