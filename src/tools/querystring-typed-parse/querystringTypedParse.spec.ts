import { querystringTypedParse } from './querystringTypedParse';
import { launchParamsParsers } from './wellKnownParsers/launchParams';
import { parserRule, parseBoolean } from './helpers';

describe('[querystringTypedParse]', () => {
  let defaultMockParams = {};
  beforeEach(() => {
    defaultMockParams = {
      accessTokenSettings: [],
      appId: 0,
      areNotificationsEnabled: false,
      client: null,
      groupId: null,
      isAppUser: false,
      isFavorite: false,
      language: 'ru',
      odrEnabled: false,
      platform: 'mobile_android',
      ref: 'other',
      sign: '',
      ts: 0,
      userId: 0,
      viewerGroupRole: 'none',
    };
  });

  test('Empty querystring parses with querystringTypedParse defaults', () => {
    expect(querystringTypedParse('', { parsers: launchParamsParsers })).toEqual(defaultMockParams);
  });

  test('Common querystring parses to relative object', () => {
    expect(
      querystringTypedParse(
        'vk_app_id=123456&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=1&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1655996361&vk_user_id=987654321',
        { parsers: launchParamsParsers },
      ),
    ).toEqual({
      ...defaultMockParams,
      appId: 123456,
      areNotificationsEnabled: false,
      isAppUser: true,
      isFavorite: true,
      language: 'ru',
      platform: 'desktop_web',
      ref: 'other',
      ts: 1655996361,
      userId: 987654321,
    });
  });

  test('Common querystring with custom params parses to relative object', () => {
    type LaunchExperiments = Record<number, number>;

    function parseVkExperiments(value: string): LaunchExperiments {
      try {
        return JSON.parse(Buffer.from(value, 'base64').toString());
      } catch {
        return {};
      }
    }

    expect(
      querystringTypedParse(
        'vk_app_id=123456&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=1&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1655996361&vk_user_id=987654321&vk_experiment=987654321',
        {
          parsers: {
            ...launchParamsParsers,
            experiments: parserRule<LaunchExperiments>({}, 'vk_experiment', parseVkExperiments),
          },
        },
      ),
    ).toEqual({
      ...defaultMockParams,
      appId: 123456,
      areNotificationsEnabled: false,
      isAppUser: true,
      isFavorite: true,
      language: 'ru',
      platform: 'desktop_web',
      ref: 'other',
      ts: 1655996361,
      userId: 987654321,
      experiments: {},
    });
  });

  test('Custom querystring parses to relative object', () => {
    expect(
      querystringTypedParse('method=like&target_id=987654321&is_verified=true', {
        parsers: {
          targetId: parserRule(0, 'target_id', parseInt),
          isVerified: parserRule(false, 'is_verified', parseBoolean),
          isLikeMethod: parserRule(false, 'method', (value) => value === 'like'),
        },
      }),
    ).toEqual({
      targetId: 987654321,
      isLikeMethod: true,
      isVerified: true,
    });
  });
});
