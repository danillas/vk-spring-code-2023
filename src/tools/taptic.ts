import { TapticNotificationType, TapticVibrationPowerType, VKBridge } from '@vkontakte/vk-bridge';

// eslint-disable-next-line
export class Taptic {
  private static vkBridge?: VKBridge;

  static init(vkBridge: VKBridge) {
    Taptic.vkBridge = vkBridge;
  }

  /**
   * Посылает тактильное уведомление
   */
  static notificationOccured(type: TapticNotificationType): void {
    Taptic.vkBridge?.send('VKWebAppTapticNotificationOccurred', { type }).catch(() => null);
  }

  /**
   * Посылает тактильное уведомление об изменении
   */
  static selectionChanged(): void {
    Taptic.vkBridge?.send('VKWebAppTapticSelectionChanged', {}).catch(() => null);
  }

  /**
   * Посылает тактильное уведомление о столкновении
   */
  static impactOccured(style: TapticVibrationPowerType): void {
    Taptic.vkBridge?.send('VKWebAppTapticImpactOccurred', { style }).catch(() => null);
  }
}
