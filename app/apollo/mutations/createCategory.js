import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import categoryFragment from '../fragments/category'

export const CreateCategoryMutation = gql`
  mutation createCategory (
    $organization: OrganizationInput!
  ) {
    createCategory(
      organization: $organization
    ) {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`

export const mutationConfig = {
  props: ({mutate, ownProps: {subdomain} }) => ({
    createObj: () => mutate({
      variables: {
        organization: {
          subdomain
        },
      },
    }),
  }),
}

export default graphql(CreateCategoryMutation, mutationConfig)
