export type StorageChangeListener<T> = (storage: Readonly<T>) => void;
export type StorageValidator<T> = { [K in keyof T]?: (value: T[K]) => boolean };

export interface StorageParams<T extends StorageState> {
  methods: StorageMethods<T>;
  /** Значения по умолчанию */
  initialState: Readonly<T>;
  /** Функция-валидатор записываемых значений */
  validator?: StorageValidator<T>;
  /** Режим обработки ошибок записи ключей */
  errorHandlingMode?: StorageErrorHandlingMode;
}

export type StoragePairs<T, K extends keyof T> = Array<{ key: K; value: T[K] }>;

export type StorageState = Record<string, any>;

/**
 * Методы работы с хранилищем
 */
export interface StorageMethods<T extends StorageState> {
  /**
   * Запись
   *
   * @param params - массив {key, value}, которые необходимо записать
   * @return массив успешно записанных пар {key, value}, т.к один из await-ов
   * в цикле for может упасть, в результате могут вернуться значения не всех переданных ключей
   */
  set<K extends keyof T>(params: StoragePairs<T, K>): Promise<StoragePairs<T, K>>;

  /**
   * Получение значения ключа
   *
   * @param keys - массив необходимых ключей.
   * @return В результате могут вернуться значения не всех переданных ключей. Eсли запрашиваемый
   * ключ не был получен, не возвращает ничего - он заменится значением по умолчанию из - {@link StorageParams.initialState}
   * в основном модуле storage
   */
  get<K extends keyof T>(keys: K[]): Promise<StoragePairs<T, K>>;

  /**
   * Сброс к значению по умолчанию
   *
   * @param params - массив ключей, которые необходимо сбросить
   * @return Массив успешно сброшенных ключей. В случае ошибки возвращает пустой массив
   */
  reset<K extends keyof T>(params: K[]): Promise<K[]>;
}

/**
 * Режим обработки ошибок записи ключей
 */
export enum StorageErrorHandlingMode {
  /** Никак не обрабатывать, возвращать дальше */
  Throw = 'throw',
  /** Игнорировать, не возвращать */
  Ignore = 'ignore',
  /** Устанавливает записываемое значение досрочно. Откатывает к предыдущему состоянию, если произошла ошибка. */
  Rollback = 'rollback',
}
