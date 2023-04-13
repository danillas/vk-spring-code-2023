import { querystringTypedParse, launchParamsParsers, parserRule } from 'src/tools';

interface GetLaunchParamsProps {
  query: string;
}

export type LaunchParams = ReturnType<typeof getLaunchParams>;

export function getLaunchParams(props: GetLaunchParamsProps) {
  const { query } = props;

  const formattedQuery = query.startsWith('?') ? query.substring(1) : query;

  return querystringTypedParse(query, {
    parsers: {
      ...launchParamsParsers,
      rawQuery: parserRule(formattedQuery, '', () => ''),
    },
  });
}
