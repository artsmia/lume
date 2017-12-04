import gql from 'graphql-tag'

const mutation = gql`
  mutation deleteThematic (
    $thematicId: ID!
  ) {
    deleteThematic(
      id: $thematicId
    ) {
      message
    }
  }
`

export default mutation
