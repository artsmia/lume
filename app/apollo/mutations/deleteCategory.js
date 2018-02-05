import {graphql } from 'react-apollo'
import gql from 'graphql-tag'

const deleteCategory = gql`
  mutation deleteCategory (
    $categoryId: ID!
  ) {
    deleteCategory(
      id: $categoryId
    )
  }
`

const mutationConfig = {
  props: ({mutate, ownProps: {categoryId} }) => ({
    deleteCategory: () => mutate({
      variables: {
        categoryId,
      },
      refetchQueries: [
        "OrganizationQuery"
      ]
    }),
  }),

}

export default graphql(deleteCategory, mutationConfig)
