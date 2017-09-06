import { graphql, compose } from 'react-apollo'
import Zoomer from './Zoomer'
import ImageQuery from './query.graphql'

const queryConfig = {
  options: ({imageId}) => ({
    variables: {
      imageId,
    },
  })
}


const query = graphql(ImageQuery, queryConfig)




export default compose(
  query,
)(
  Zoomer
)
