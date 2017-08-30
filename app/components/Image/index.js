import { graphql, compose } from 'react-apollo'
import ImageEditor from './ImageEditor'
import ImageQuery from './query.graphql'

const queryConfig = {
  options: ({imageId}) => ({
    variables: {
      imageId,
    },
  })
}



const mutationConfig = {
  name: "editOrCreateClip",
}


const query = graphql(ImageQuery, queryConfig)




export default compose(
  query,
)(
  ImageEditor
)
