import { ApolloClient, createNetworkInterface } from 'react-apollo'
import fetch from 'isomorphic-fetch'
import {apiUrl} from '../config'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  return new ApolloClient({
    addTypename: true,
    initialState,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface: createNetworkInterface({
      uri: apiUrl, // Server URL (must be absolute)
      // opts: { // Additional fetch() options like `credentials` or `headers`
      //   credentials: 'same-origin'
      // }
    })
  })
}

export default function initApollo (initialState) {
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
