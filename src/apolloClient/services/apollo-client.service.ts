import { ApolloClient, createHttpLink, from, InMemoryCache, MutationOptions, QueryOptions } from '@apollo/client/core';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import fetcher from 'isomorphic-fetch';

import { ApolloClientConfigType } from '../types';

@Injectable({ scope: Scope.REQUEST })
export class ApolloClientService {
  protected readonly apolloClient: any;
  apollo: any;

  constructor(
    protected config: ApolloClientConfigType,
    protected configService: ConfigService,
    @Inject(CONTEXT) protected context: any,
  ) {
    const contexts = [];
    let headers: any = {};
    if (config.headers) {
      headers = { ...headers, ...config.headers };
    }
    const httpLink = createHttpLink({
      uri: `${config.host}${config.endpoint ? config.endpoint : '/graphql'}`,
      fetchOptions: {
        fetch: fetcher,
      },
      headers,
    });

    contexts.push(httpLink);

    this.apolloClient = new ApolloClient({
      link: from(contexts),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
      },
    });
  }

  async request<T>(request: QueryOptions | MutationOptions, responseKey?: string, headers: any = {}): Promise<T> {
    if (request.context) {
      if (!request.context.headers) {
        request.context = { ...request.context, headers: {} };
      }
    } else {
      request.context = { headers: {} };
    }
    request.context.headers = { ...request.context.headers, ...headers };
    if ('query' in request && responseKey) {
      const {
        data: { [responseKey]: response },
      } = await this.apolloClient.query(request);
      return response;
    } else if ('mutation' in request && responseKey) {
      const {
        data: { [responseKey]: response },
      } = await this.apolloClient.mutate(request);
      return response;
    } else if ('query' in request && !responseKey) {
      return await this.apolloClient.query(request);
    } else if ('mutation' in request && !responseKey) {
      return await this.apolloClient.mutate(request);
    }
  }
}
