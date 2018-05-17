import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import defaults from './local/defaults'
import resolvers from './local/resolvers'
import typeDefs from './local/typeDefs'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { setContext } from 'apollo-link-context'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState) {
  const httpLink = new HttpLink({
    uri: process.env.API_URL
  })

  const cache = new InMemoryCache().restore(initialState || {})

  const stateLink = withClientState({
    resolvers,
    defaults,
    typeDefs,
    cache
  })

  const authLink = setContext(async (req, prevCtx) => {
    try {
      let authHeaders = {}
      if (process.browser) {
        let idToken = localStorage.getItem('idToken')
        let userId = localStorage.getItem('userId')
        if (idToken && userId) {
          Object.assign(authHeaders, {
            authorization: `Bearer ${idToken}`,
            userid: userId
          })
        }
      }

      return {
        headers: {
          ...prevCtx.headers,
          ...authHeaders
        }
      }
    } catch (ex) {
      console.error(ex)
    }
  })

  const link = ApolloLink.from([authLink, stateLink, httpLink])

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache
  })
}

function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown'
}

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(
      ComposedComponent
    )})`
    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    static async getInitialProps(ctx) {
      // Initial serverState with apollo (empty)
      let serverState

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo()
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <ComposedComponent ctx={ctx} {...composedInitialProps} />,
          {
            router: {
              asPath: ctx.asPath,
              pathname: ctx.pathname,
              query: ctx.query
            },
            client: apollo
          }
        )
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      serverState = {
        apollo: {
          data: apollo.cache.extract()
        }
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    constructor(props) {
      super(props)
      this.apollo = initApollo(this.props.serverState.apollo.data)
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
