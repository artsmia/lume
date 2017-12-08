import OrgHome from './OrgHome'
import {graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query OrgHomeQuery ($subdomain: String) {
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
    const {url: {query: {subdomain}}} = props
    return {
      variables: {
        subdomain
      }
    }
  }
}


export default compose(
  graphql(query, options)
)(
  OrgHome
)
