import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


const joinOrganizationMutation = gql`
  mutation joinOrganization (
    $userId: ID!
    $organizationId: ID
    $role: RoleEnum
  ) {
    editUserOrganizationRole(
      userId: $userId
      organization: {
        id: $organizationId
      }
      role: $role
    ) {
      id
      organizations {
        id
        subdomain
        role
      }
    }
  }
`



export default graphql(joinOrganizationMutation, {
  name: "joinOrganization"
})
