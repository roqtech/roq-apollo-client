import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { ApolloClientConfigType } from '../types';
import { ApolloClientOptionsFactoryInterface } from './apollo-client-options-factory.interface';

export interface ApolloClientModuleAsyncOptionsInterface extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ApolloClientOptionsFactoryInterface>;
  useClass?: Type<ApolloClientOptionsFactoryInterface>;
  useFactory?: (...args: any[]) => Promise<ApolloClientConfigType> | ApolloClientConfigType;
  inject?: any[];
}
