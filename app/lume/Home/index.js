import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Home from './Home'


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


export default compose(
  graphql(query, queryConfig),
)(
  Home
)
