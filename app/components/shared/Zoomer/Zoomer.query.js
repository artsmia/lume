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
      host
      organization {
        id
        customImageApiEnabled
        subdomain
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
