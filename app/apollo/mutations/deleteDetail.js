import gql from 'graphql-tag'

const mutation = gql`
  mutation deleteDetail (
    $detailId: ID!
  ) {
    deleteDetail(
      id: $detailId
    ) {
      id
      details {
        id
      }
    }
  }
`

export default mutation
