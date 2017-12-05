import { graphql, compose } from 'react-apollo'
import Detail from './Detail'
import gql from 'graphql-tag'

const query = gql`
  query DetailQuery (
    $detailId: ID!
  ) {
    detail (
      id: $detailId
    ) {
      id
      title
      image {
        id
      }
      index
      description
      additionalImages {
        id
      }
    }
  }
`



const config = {
  options: ({detailId}) => ({
    variables: {
      detailId,
    }
  })
}

export default compose(
  graphql(query, config),
)(
  Detail
)

export const PreviewObj = Detail
