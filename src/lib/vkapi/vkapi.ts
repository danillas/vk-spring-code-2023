import { PersonalAuthScope, ErrorData, VKBridge } from '@vkontakte/vk-bridge';
import { itemsMissed, VkBridgeNetworkError } from './utils';

interface Credentials {
  authorized: boolean;
  accessToken: string;
  scope: PersonalAuthScope[];
}

export class VKApi {
  private readonly credentials: Credentials = {
    authorized: false,
    accessToken: '',
    scope: [],
  };

  public get authorized() {
    return this.credentials.authorized;
  }

  /**
   * Инициализация клиента для работы с VKApi
   * @param appId идентификатор приложения
   * @param version версия API
   * @param lang язык
   * @param vkApiUrl путь к запросам API ВК
   */
  constructor(
    private readonly appId: number,
    private readonly version: string,
    private readonly lang: string,
    private readonly vkApiUrl: string,
    private readonly vkBridge: VKBridge,
  ) {}

  /**
   * Получение ключа доступа с последующей проверкой набора прав доступа, предоставленных пользователем
   * @param scope набор прав доступа
   * @returns access token
   */
  private async getAccessToken(scope: PersonalAuthScope[]): Promise<string> {
    return this.vkBridge
      .send('VKWebAppGetAuthToken', {
        app_id: this.appId,
        scope: scope.join(','),
      })
      .then((response) => {
        const recievedScope = response.scope ? response.scope.split(',') : [];
        const missedScope = itemsMissed(scope, recievedScope);

        return missedScope.length > 0
          ? Promise.reject({ message: 'Access token scope missed', expected: scope, recieved: recievedScope })
          : response.access_token;
      });
  }

  /**
   * Вызов метода API
   * - если хватает прав доступа, токен автоматически перезапросится
   * - если произойдет ошибка из-за смены IP сети, токен автоматически обновится
   * @param method метод
   * @param params параметры
   * @param scope набор прав доступа, необходимый для метода
   */
  async call<R = any, P = any>(
    method: string,
    params?: P,
    scope: PersonalAuthScope | PersonalAuthScope[] = [],
  ): Promise<R> {
    const callMethod = () => {
      return this.vkBridge.send('VKWebAppCallAPIMethod', {
        method,
        params: { v: this.version, access_token: this.credentials.accessToken, lang: this.lang, ...params },
      });
    };

    return callMethod()
      .catch((error: ErrorData) => Promise.reject(error))
      .then(({ response }) => response);
  }

  /**
   * Вызов метода API эксперементальным способом
   * через Beacon API
   * Используем для отправки данных в аналитику
   * @param method метод
   * @param params параметры
   */
  callBeacon<P = any>(method: string, params?: P) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (navigator && navigator['sendBeacon'] && this.credentials.authorized) {
      return navigator.sendBeacon(
        `${this.vkApiUrl}/${method}`,
        new URLSearchParams({
          v: this.version,
          access_token: this.credentials.accessToken,
          lang: this.lang,
          ...params,
        }),
      );
    }

    return false;
  }
}
