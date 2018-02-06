import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'

import defaults from './local/defaults'
import resolvers from './local/resolvers'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('IDToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const stateLink = withClientState({ resolvers, cache, defaults })


const httpLink = new HttpLink({
  uri: process.env.API_URL,
})

const link = ApolloLink.from([stateLink, httpLink])

const config = {
  cache,
  link
}

export default withData(config)
