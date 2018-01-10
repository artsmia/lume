import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'
import {apiUrl} from '../config'

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

console.log("Here in apollo", apiUrl)

const config = {
  cache,
  link: new HttpLink({
    uri: apiUrl,
  })
}

export default withData(config)
