import { gql, graphql, compose } from 'react-apollo'
import AppHome from './AppHome'


const data = gql`
  query organization (
    $orgSub: String
  ) {
    organization (
      subdomain: $orgSub
    ) {
      id
      name
    }
  }
`

const config = {
  options: ({orgSub}) => ({
    variables: {
      orgSub
    }
  })
}

export default compose(
  graphql(data, config),
)(
  AppHome
)
