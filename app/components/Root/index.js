import { gql, graphql, compose } from 'react-apollo'
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
