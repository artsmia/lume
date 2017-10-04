import { graphql, compose } from 'react-apollo'
import Image from './Image'
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
  Image
)
