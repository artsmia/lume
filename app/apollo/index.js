import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'

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

const config = {
  cache,
  link: new HttpLink({
    uri: process.env.API_URL,
  })
}

export default withData(config)
