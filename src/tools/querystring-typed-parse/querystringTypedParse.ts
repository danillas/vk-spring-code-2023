import { querystring as qs } from '@vkontakte/vkjs';
import { ParserRule } from './helpers';

export const querystringTypedParse = <
  T extends Record<string, ParserRule<unknown, unknown>> = Record<never, unknown>,
  R extends Record<string, unknown> = { [K in keyof T]: T[K]['initialValue'] },
>(
  query: string,
  options: { parsers: T },
): R => {
  const formattedQuery = query.startsWith('?') ? query.substring(1) : query;
  const parsedQuery = qs.parse(formattedQuery);

  return Object.entries(options.parsers).reduce<any>((acc, [key, rule]) => {
    if (rule.queryName in parsedQuery) {
      acc[key] = rule.parser(parsedQuery[rule.queryName] as string);
    } else {
      acc[key] = rule.initialValue;
    }
    return acc;
  }, {});
};
