import OrgHome from './OrgHome'
import { gql, graphql, compose } from 'react-apollo'

const organization = gql`
  query organization ($subdomain: String) {
    organization  (
      subdomain: $subdomain
    ) {
      id
      name
    }
  }
`

const options = {
  options: (props) => {
    const {url: {query: {orgSub}}} = props
    return {
      variables: {
        subdomain: orgSub
      }
    }
  }
}


export default compose(
  graphql(organization, options)
)(
  OrgHome
)
