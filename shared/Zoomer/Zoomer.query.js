import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query ZoomerQuery (
    $imageId: ID!
    $detailId: ID!
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
    }
    # detail (
    #   id: $detailId
    # ) {
    #   id
    #   image {
    #     id
    #     organization {
    #       id
    #       customImageApiEnabled
    #     }
    #     localId
    #   }
    #   crops {
    #     id
    #     index
    #     geometry {
    #       type
    #       coordinates
    #     }
    #   }
    # }
  }
`


const queryConfig = {
  options: ({imageId = "", detailId = ""}) => ({
    variables: {
      imageId,
      detailId,
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}




export default graphql(query, queryConfig)
