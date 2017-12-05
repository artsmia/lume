import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Root from './Root'


const organizations = gql`
  query organizations {
    organizations {
      id
      name
      subdomain
    }
  }
`

export default compose(
  graphql(organizations),
)(
  Root
)
