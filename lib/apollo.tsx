/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
import React from 'react';
import Head from 'next/head';
// import cookie from 'cookie';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink,
  ApolloProvider,
} from '@apollo/client';
// import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { NextPage } from 'next';

import fetch from 'isomorphic-unfetch';

const isBrowser: boolean = typeof window === 'undefined';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Creates and configures the ApolloClient
 */
// eslint-disable-next-line max-len
function createApolloClient(initialState: NormalizedCacheObject = {}, cookie?: string): ApolloClient<NormalizedCacheObject> {
  const headers = cookie ? { cookie } : undefined;

  const httpLink = new HttpLink({
    uri: 'http://localhost:8080/v1/graphql', // Server URL (must be absolute)
    credentials: 'include', // Additional fetch() options like `credentials` or `headers`
    headers,
    fetch,
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: cookie,
      },
    });
    return forward(operation);
  });

  // const link = createPersistedQueryLink().concat(authLink);
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: true,
  });
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(initialState?: NormalizedCacheObject, cookie?: string) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return createApolloClient(initialState, cookie);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 */
function withApollo<PageProps>(PageComponent: NextPage<PageProps>, { ssr = true } = {}) {
  // eslint-disable-next-line max-len
  type ApolloPageProps = PageProps & { apolloClient?: ApolloClient<NormalizedCacheObject> | null; apolloState?: NormalizedCacheObject; }
  const WithApollo: NextPage<ApolloPageProps> = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps as any as PageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      // eslint-disable-next-line max-len
      const cookie = ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie && String(ctx.req.headers.cookie);
      // @ts-ignore
      const apolloClient = (ctx.apolloClient = initApolloClient({}, cookie));

      // Run wrapped getInitialProps methods
      let pageProps = {} as PageProps;
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (!isBrowser) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />,
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

export default withApollo;
