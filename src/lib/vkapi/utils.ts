export const itemsMissed = <T>(template: T[], target: T[]) => target.filter((item) => !template.includes(item));

/**
 * Получает доступ к полю сложно вложенного объекта object по path (разделитель '.')
 * @param {object} object
 * @param {string} path
 */
export function getObjectPath(object: any, path: string): any | undefined {
  return path.split('.').reduce((buffer, x) => {
    return buffer && buffer.hasOwnProperty(x) ? buffer[x] : undefined;
  }, object);
}

export class VkBridgeNetworkError extends Error {
  name = 'VKWebAppCallAPIMethod';

  constructor(method: string) {
    super();

    this.message = `[vkApi] (${method}) retry failed`;
  }
}
