import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query organizations {
    organizations {
      id
      name
      subdomain
    }
  }
`

const queryConfig = {
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}




export default graphql(query, queryConfig)
