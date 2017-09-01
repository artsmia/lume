import { graphql, compose } from 'react-apollo'
import ImageManager from './ImageManager'
import query from './query.graphql'

const queryOptions = {
  options: ({orgId}) => ({
    variables: {
      orgId
    }
  })
}

export default compose(
  graphql(query, queryOptions),
)(
  ImageManager
)
