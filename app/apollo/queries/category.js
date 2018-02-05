import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import categoryFragment from '../fragments/category'

export const CategoryQuery = gql`
  query CategoryQuery (
    $categoryId: ID!
  ) {
    category (
      id: $categoryId
    ) {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`


const queryConfig = {
  options: ({categoryId}) => ({
    variables: {
      categoryId
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(CategoryQuery, queryConfig)
