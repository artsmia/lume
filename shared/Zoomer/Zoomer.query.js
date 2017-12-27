import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query ZoomerQuery (
    $imageId: ID!
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
  }
`


const queryConfig = {
  options: ({imageId = ""}) => ({
    variables: {
      imageId,
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}




export default graphql(query, queryConfig)
