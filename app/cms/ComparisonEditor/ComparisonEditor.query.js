import gql from 'graphql-tag'
import {graphql } from 'react-apollo'


export const ComparisonQuery = gql`
  query ComparisonEditorQuery (
    $comparisonId: ID!
  ) {
    comparison (
      id: $comparisonId
    ) {
      id
      title
      description
      comparisonImage0 {
        id
      }
      comparisonImage1 {
        id
      }

    }
  }

`


const queryConfig = {
  options: ({comparisonId}) => ({
    variables: {
      comparisonId
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(ComparisonQuery, queryConfig)
