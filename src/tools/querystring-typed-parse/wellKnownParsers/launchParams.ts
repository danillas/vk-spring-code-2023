// Source:
// eslint-disable-next-line max-len
// https://dev.vk.com/mini-apps/development/launch-params

import { asTypedString, parseBoolean, parseCommaSeparatedList, parserRule } from '../helpers';

export type Language = 'ru' | 'uk' | 'ua' | 'be' | 'kz' | 'en' | 'es';

/**
 * Роль пользователя в сообществе, из которого запущено приложение
 */
export enum ViewerGroupRole {
  /* Не состоит в сообществе */
  None = 'none',
  /* Участник сообщества */
  Member = 'member',
  /* Модератор сообщества */
  Moderator = 'moder',
  /* Редактор сообщества */
  Editor = 'editor',
  /* Администратор сообщества */
  Admin = 'admin',
}

/**
 * @link {ViewerGroupRole}
 * */
export type ViewerGroupType = `${ViewerGroupRole}`;

/**
 * Платформа, на которой был запущен миниаппа
 */
export enum LaunchPlatform {
  /* Веб-версия ВКонтакте */
  Web = 'desktop_web',
  /* Мобильная веб-версия ВКонтакте */
  MobileWeb = 'mobile_web',
  /* Официальное приложение ВКонтакте на Android */
  Android = 'mobile_android',
  /* Официальное приложение ВКонтакте на iPhone */
  IPhone = 'mobile_iphone',
  /* Официальное приложение ВКонтакте на iPad */
  IPad = 'mobile_ipad',
  /* Официальное приложение VK Мессенджер на Android */
  AndroidMessenger = 'mobile_android_messenger',
  /* Официальное приложение VK Мессенджер на iPhone */
  IPhoneMessenger = 'mobile_iphone_messenger',
  /* Нативное приложение на Android с webview одного миниаппа (нативная эталонка) */
  MiniAppAndroidClient = 'mini_app_android_client',
  /* Нативное приложение на iPhone с webview одного миниаппа (нативная эталонка) */
  MiniAppIosClient = 'mini_app_ios_client',
  /* Прочий запуск миниаппа вне официального приложения ВКонтакте на Android */
  AndroidExternal = 'android_external',
  /* Прочий запуск миниаппа вне официального приложения ВКонтакте на iOS */
  IosExternal = 'ios_external',
  /* Прочий запуск миниаппа вне официального приложения ВКонтакте на iPad */
  IPadExternal = 'ipad_external',
  /* Прочий запуск миниаппа вне веб-версии ВКонтакте */
  WebExternal = 'web_external',
  /* Прочий запуск миниаппа вне мобильной веб-версии ВКонтакте */
  MobileWebExternal = 'mvk_external',
}

/**
 * @link {LaunchPlatform}
 */
export type LaunchPlatformType = `${LaunchPlatform}`;

/**
 * Клиент, в котором запущен миниапп. Значение приходит только в случае, если
 * он отличается от официального приложения ВКонтакте
 */
export enum LaunchClient {
  /* Одноклассники */
  Ok = 'ok',
  /* Почта MailRu */
  MailRu = 'mail',
}

export type LaunchClientType = `${LaunchClient}`;

export const launchParamsParsers = {
  userId: parserRule(0, 'vk_user_id', parseInt),
  appId: parserRule(0, 'vk_app_id', parseInt),
  isAppUser: parserRule(false, 'vk_is_app_user', parseBoolean),
  areNotificationsEnabled: parserRule(false, 'vk_are_notifications_enabled', parseBoolean),
  language: parserRule<Language>('ru', 'vk_language', asTypedString),
  ref: parserRule('other', 'vk_ref', asTypedString),
  accessTokenSettings: parserRule<string[]>([], 'vk_access_token_settings', parseCommaSeparatedList),
  groupId: parserRule<number | null>(null, 'vk_group_id', parseInt),
  viewerGroupRole: parserRule<ViewerGroupRole>(ViewerGroupRole.None, 'vk_viewer_group_role', asTypedString),
  platform: parserRule<LaunchPlatform>(LaunchPlatform.Android, 'vk_platform', asTypedString),
  isFavorite: parserRule(false, 'vk_is_favorite', parseBoolean),
  ts: parserRule(0, 'vk_ts', parseInt),
  client: parserRule<LaunchClient | null, LaunchClient>(null, 'vk_client', asTypedString),
  odrEnabled: parserRule(false, 'odr_enabled', parseBoolean),
  sign: parserRule('', 'sign', asTypedString),
} as const;
