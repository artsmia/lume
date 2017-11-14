import { graphql, compose } from 'react-apollo'
// import Zoomer from './GoogleZoomer'
import Zoomer from './Zoomer'
import gql from 'graphql-tag'

const query = gql`
  query ZoomerQuery (
    $imageId: ID!
    $detailId: ID!
    $itemId: ID!
  ) {
    image (
      id: $imageId
    ) {
      id
      organization {
        id
        customImageApiEnabled
      }
      localId
      host
      gdriveId
    }
    detail (
      id: $detailId
    ) {
      id
      image {
        id
        organization {
          id
          customImageApiEnabled
        }
        host
        gdriveId
        localId
      }
      geometry {
        type
        coordinates
      }
    }
    item (
      id: $itemId
    ) {
      id
      mainImage {
        id
        localId
        organization {
          id
          customImageApiEnabled
        }
      }
      details {
        id
        index
        image {
          id
        }
        geometry {
          type
          coordinates
        }
      }
    }
  }
`


const queryConfig = {
  options: ({imageId = "", detailId = "", itemId = ""}) => ({
    variables: {
      imageId,
      detailId,
      itemId
    },
  })
}




export default compose(
  graphql(query, queryConfig),
)(
  Zoomer
)
