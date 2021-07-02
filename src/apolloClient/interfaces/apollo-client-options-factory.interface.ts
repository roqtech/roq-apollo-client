import { ApolloClientModuleAsyncOptionsInterface } from './apollo-client-module-async-options.interface';

export interface ApolloClientOptionsFactoryInterface {
  createApolloClientOptions():
    | Promise<ApolloClientModuleAsyncOptionsInterface>
    | ApolloClientModuleAsyncOptionsInterface;
}
