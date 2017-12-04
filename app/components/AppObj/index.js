import { graphql, compose } from 'react-apollo'
import AppObj from './AppObj'
import gql from 'graphql-tag'

const query = gql`
  query ObjQuery (
    $objId: ID!
  ) {
    obj (
      id: $objId
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
      relatedThematics {
        id
        title
        previewImage {
          id
        }
      }
      relatedObjs {
        id
        title
      }
    }
  }

`

const config = {
  options: ({objId}) => ({
    variables: {
      objId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  AppObj
)

export const PreviewAppObj = AppObj
