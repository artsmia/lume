import { graphql, compose } from 'react-apollo'
import ClipEditor from './ClipEditor'
import ClipQuery from './query.graphql'
import editOrCreateClip from '../../apollo/mutations/editOrCreateClip.graphql'


const queryConfig = {
  options: ({clipId}) => ({
    variables: {
      clipId,
    },
  })
}



const mutationConfig = {
  name: "editOrCreateClip",
}


const query = graphql(ClipQuery, queryConfig)




export default compose(
  query,
  graphql(editOrCreateClip, mutationConfig)
)(
  ClipEditor
)
