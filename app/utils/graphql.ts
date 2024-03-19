import { GraphQLClient } from 'graphql-request';
import { Config } from 'sst/node/config';
import { getSdk } from '~/gql/graphql';

const client = new GraphQLClient(Config.VITE_API_ENDPOINT || '');
const sdk = getSdk(client);

export function getGQLClient() {
  return sdk;
}
