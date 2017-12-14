import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {ComparisonQuery} from './ComparisonEditor.query'

const editComparison = gql`
  mutation editComparison (
    $id: ID!
    $title: String
    $description: String
    $comparisonImage0Id: ID
    $comparisonImage1Id: ID
  ) {
    editComparison(
      id: $id
      title: $title
      description: $description
      comparisonImage0Id: $comparisonImage0Id
      comparisonImage1Id: $comparisonImage1Id
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

const mutationConfig = {
  props: ({mutate, ownProps: {comparisonId} }) => ({
    editComparison: ({
      title,
      description,
      comparisonImage0Id,
      comparisonImage1Id
    }) => mutate({
      variables: {
        id: comparisonId,
        title,
        description,
        comparisonImage0Id,
        comparisonImage1Id
      },
    }),
  }),

}

export default graphql(editComparison, mutationConfig)
