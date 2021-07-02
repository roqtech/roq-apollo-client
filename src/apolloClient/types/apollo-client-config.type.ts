export class ApolloClientConfigType {
  host: string;
  endpoint?: string;
  headers?: Record<string, unknown>;
  'request-caller': string;
}
