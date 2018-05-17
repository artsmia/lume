import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import categoryFragment from '../fragments/category'

export const CreateCategoryMutation = gql`
  mutation createCategory($organization: OrganizationInput!) {
    createCategory(organization: $organization) {
      id
      title
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`

export const mutationConfig = {
  props: ({
    mutate,
    ownProps: {
      router: {
        query: { subdomain }
      }
    }
  }) => ({
    createCategory: () =>
      mutate({
        variables: {
          organization: {
            subdomain
          }
        },
        refetchQueries: ['OrganizationQuery']
      })
  })
}

export default graphql(CreateCategoryMutation, mutationConfig)
