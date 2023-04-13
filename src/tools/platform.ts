import { isIOS } from '@vkontakte/vkjs';
import { Platform } from '@vkontakte/vkui';
import { LaunchPlatform } from './querystring-typed-parse';

export function getPlatformByLaunchPlatform(platform: LaunchPlatform): Platform {
  switch (platform) {
    case 'desktop_web':
    case 'web_external':
      return Platform.VKCOM;
    default:
      return isIOS ? Platform.IOS : Platform.ANDROID;
  }
}

export function getIsMiniAppClientByLaunchPlatform(platform: LaunchPlatform) {
  return platform === 'mini_app_android_client' || platform === 'mini_app_ios_client';
}
