export function asTypedString<T extends string>(value: string): T {
  return value as T;
}

export function parseBoolean(value: string): boolean {
  return value === '1' || value === 'true';
}

export function parseCommaSeparatedList<T extends string = string>(value: string): T[] {
  return value.length === 0 ? [] : (value.split(',') as T[]);
}

export interface ParserRule<T, G extends T = T> {
  initialValue: T;
  queryName: string;
  parser: (value: string) => G;
}

export const parserRule = <T, G extends T = T>(
  initialValue: T,
  queryName: string,
  parser: (value: string) => G,
): ParserRule<T, G> => ({ initialValue, queryName, parser });
