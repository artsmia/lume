import { graphql, compose } from 'react-apollo'
import ImageManager from './ImageManager'
import query from './query.graphql'

const queryOptions = {
  options: ({orgId, imageId}) => {

    return {
      variables: {
        filter: {
          limit: 10,
          organizationId: orgId
        },
        imageId: imageId || ""
      }
    }
  }
}

export default compose(
  graphql(query, queryOptions),
)(
  ImageManager
)
