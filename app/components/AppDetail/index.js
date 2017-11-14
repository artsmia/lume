import { graphql, compose } from 'react-apollo'
import AppDetail from './AppDetail'
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
  AppDetail
)

export const PreviewAppItem = AppDetail
