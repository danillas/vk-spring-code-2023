# Типизированный парсинг querystring

## Пример 0

Парсинг любого querystring

```typescript
import {parserRule, querystringTypedParse, helpers} from 'mini-apps-utils/querystring-typed-parse';

const result = querystringTypedParse('method=like&target_id=2&is_verified=true', {
  parsers: {
    targetId: parserRule(0, 'target_id', parseInt),
    isVerified: parserRule(false, 'is_verified', helpers.parseBoolean),
    isLikeMethod: parserRule(false, 'method', (value) => value === 'like'),
  },
});
```

## Пример 1

Парсинг стандартных параметров запуска

```typescript
import {launchParamsParsers, querystringTypedParse} from 'mini-apps-utils/querystring-typed-parse';

const launchParams = querystringTypedParse(window.location.search, {parsers: launchParamsParsers});

type LaunchParams = typeof launchParams;
```

## Пример 2

Расширение стандартных параметров запуска

```typescript
import {launchParamsParsers, parserRule, querystringTypedParse} from 'mini-apps-utils/querystring-typed-parse';

type LaunchExperiments = Record<number, number>;

function parseVkExperiments(value: string): LaunchExperiments {
  try {
    return JSON.parse(atob(value));
  } catch {
    return {};
  }
}

const launchParams = querystringTypedParse('vk_user_id=123&vk_app_id=222&...', {
  parsers: {
    ...launchParamsParsers,
    experiments: parserRule<LaunchExperiments>({}, 'vk_experiment', parseVkExperiments),
  },
});

type LaunchParams = typeof launchParams;
```
