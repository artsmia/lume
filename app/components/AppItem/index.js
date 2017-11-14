import { graphql, compose } from 'react-apollo'
import AppItem from './AppItem'
import gql from 'graphql-tag'

const query = gql`
  query ItemQuery (
    $itemId: ID!
  ) {
    item (
      id: $itemId
    ) {
      id
      title
      text
      medium
      attribution
      date
      mainImage {
        id
      }
      details {
        id
        title
        image {
          id
        }
        index
      }
      relatedBooks {
        id
        title
        previewImage {
          id
        }
      }
      relatedItems {
        id
        title
      }
    }
  }

`

const config = {
  options: ({itemId}) => ({
    variables: {
      itemId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  AppItem
)

export const PreviewAppItem = AppItem
