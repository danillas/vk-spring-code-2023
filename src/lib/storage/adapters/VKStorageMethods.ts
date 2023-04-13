import { StorageMethods, StorageState, StoragePairs } from '../types';
import { VKBridge } from '@vkontakte/vk-bridge';
import { delay } from 'src/tools/delay';

/** Адаптер для работы с VKStorage через VKBridge */
export class VKStorageMethods<T extends StorageState> implements StorageMethods<T> {
  constructor(private readonly vkBridge: VKBridge) {}

  public async set<K extends keyof T>(params: StoragePairs<T, K>): Promise<StoragePairs<T, K>> {
    const result = [] as StoragePairs<T, K>;

    // Устанавливаем каждый ключ последовательно, параллельно не дает iOS.
    for (const { key, value } of params) {
      await this.vkBridge
        .send('VKWebAppStorageSet', {
          key: String(key),
          value: JSON.stringify(value),
        })
        .then(() => result.push({ key, value }))
        .catch(() => void 0);
      /* Чтобы не получать {error_code: 6, error_msg: 'Too many requests per second'}, если ключей много */
      await delay(params.length > 3 ? 500 : 0);
    }

    return result;
  }

  public get<K extends keyof T>(keys: K[]) {
    return this.vkBridge.send('VKWebAppStorageGet', { keys: keys as string[] }).then(({ keys }) => {
      const result = keys.map(({ key, value }) => {
        // Eсли запрашиваемый ключ не был получен, то заменится значением по умолчанию в основном модуле storage
        try {
          return { key, value: JSON.parse(value) };
        } catch {}
      });

      return result.filter((value) => !!value) as StoragePairs<T, K>;
    });
  }

  public async reset<K extends keyof T>(params: K[]): Promise<K[]> {
    const result = [] as K[];

    // Устанавливаем каждый ключ последовательно, параллельно не дает iOS.
    for (const key of params) {
      await this.vkBridge
        .send('VKWebAppStorageSet', {
          key: String(key),
          value: '',
        })
        .then(() => result.push(key))
        .catch(() => void 0);
      /* Чтобы не получать {error_code: 6, error_msg: 'Too many requests per second'}, если ключей много */
      await delay(params.length > 3 ? 500 : 0);
    }

    return result;
  }
}
