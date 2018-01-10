import { graphql, compose } from 'react-apollo'
import Image from './Image'
import gql from 'graphql-tag'

const query = gql`
query ImageQuery (
  $imageId: ID!
) {
  image (
    id: $imageId
  ) {
    id
    organization {
      id
      customImageApiEnabled
      customImageEndpoint
    }
    title
    description
    localId
  }
}

`

const queryConfig = {
  options: ({imageId}) => ({
    variables: {
      imageId,
    },
  })
}






export default compose(
  graphql(query, queryConfig),
)(
  Image
)
