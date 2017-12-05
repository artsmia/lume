import OrgHome from './OrgSettings'
import {graphql, compose } from 'react-apollo'
import editOrCreateOrganization from '../../apollo/mutations/editOrCreateOrganization'

import gql from 'graphql-tag'

const query = gql`
  query OrgSettingQuery ($subdomain: String) {
    organization  (
      subdomain: $subdomain
    ) {
      id
      name
      newUsersRequireApproval
      users {
        id
        email
        role
      }
      customObjApiEnabled
      customObjApiEndpoint
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
  graphql(query, options),
  graphql(editOrCreateOrganization, {
    name: "editOrganization"
  })
)(
  OrgHome
)
