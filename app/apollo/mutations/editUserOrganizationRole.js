import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import userFragment from '../fragments/user'

const mutation = gql`
  mutation EditUserOrganizationRole(
    $userId: ID!
    $organization: OrganizationInput!
    $role: RoleEnum
  ) {
    editUserOrganizationRole(
      userId: $userId
      organization: $organization
      role: $role
    ) {
      ...UserFragment
    }
  }
  ${userFragment}
`

const mutationConfig = {
  props: ({ mutate, ownProps }) => ({
    editUserOrganizationRole: variables =>
      mutate({
        variables: {
          organization: {
            subdomain: ownProps.router.query.subdomain
          },
          ...variables
        }
      })
  })
}

export default graphql(mutation, mutationConfig)
