import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import organizationFragment from '../fragments/organization'


const editOrganization = gql`
  mutation EditOrganization (
    $id: ID!
    $name: String
    $newUsersRequireApproval: Boolean
    $customObjApiEnabled: Boolean
    $customObjApiEndpoint: String
  ) {
    editOrganization(
      id: $id
      name: $name
      newUsersRequireApproval: $newUsersRequireApproval
      customObjApiEnabled: $customObjApiEnabled
      customObjApiEndpoint: $customObjApiEndpoint
    ) {
      ...OrganizationFragment
    }
  }
  ${organizationFragment}

`

const mutationConfig = {
  props: ({mutate}) => ({
    editOrganization: (variables) => mutate({
      variables: {
        ...variables,
      },
    }),
  }),

}

export default graphql(editOrganization, mutationConfig)
