import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'
import {apiUrl} from '../config'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })


const config = {
  cache,
  link: new HttpLink({
    uri: apiUrl,
  })
}

export default withData(config)
