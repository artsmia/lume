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


const authLink = setContext(
  async(req, prevCtx) => {
    try {

      let authHeaders = {}
      if (process.browser){
        let idToken = localStorage.getItem('idToken')
        let userId = localStorage.getItem('userId')
        if (idToken && userId){
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
  }
)

const stateLink = withClientState({ resolvers, cache, defaults })


const httpLink = new HttpLink({
  uri: process.env.API_URL,
})

const link = ApolloLink.from([stateLink, authLink, httpLink])

const config = {
  cache,
  link
}

export default withData(config)
