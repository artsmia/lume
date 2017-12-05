import OrgHome from './OrgHome'
import {graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query OrgHomeQuery ($orgSub: String) {
    organization  (
      orgSub: $orgSub
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
        orgSub
      }
    }
  }
}


export default compose(
  graphql(query, options)
)(
  OrgHome
)
