import OrgHome from './OrgHome'
import { gql, graphql, compose } from 'react-apollo'
import query from './query.graphql'
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
  graphql(query, options)
)(
  OrgHome
)
