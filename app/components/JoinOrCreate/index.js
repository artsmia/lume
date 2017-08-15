import { gql, graphql, compose } from 'react-apollo'
import JoinOrCreate from './JoinOrCreate'

const organizations = gql`
  query organizations {
    organizations {
      id
      name
      subdomain
    }
  }
`

const addUserToOrganization = gql`
  mutation editOrCreateOrganization (
    $orgId: ID
    $newUserIds: [ID]
    $name: String
    $subdomain: String
  ) {
    editOrCreateOrganization (
      id: $orgId
      newUserIds: $newUserIds
      name: $name
      subdomain: $subdomain
    ) {
      id
      name
      subdomain
    }
  }
`

export default compose(
  graphql(organizations),
  graphql(addUserToOrganization, {
    name: "addUserToOrganization",
  })
)(
  JoinOrCreate
)
