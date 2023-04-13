import { ParentConfigData, VKBridge } from '@vkontakte/vk-bridge';

export function waitForUpdateConfig(vkBridge: VKBridge): Promise<ParentConfigData> {
  return new Promise<ParentConfigData>((resolve) => {
    vkBridge.subscribe(function listener({ detail }) {
      if (detail.type === 'VKWebAppUpdateConfig') {
        vkBridge.unsubscribe(listener);
        resolve(detail.data);
      }
    });
  });
}
