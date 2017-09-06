import { graphql, compose } from 'react-apollo'
import ClipEditor from './ClipEditor'
import ClipQuery from './query.graphql'
import editOrCreateClip from '../../apollo/mutations/editOrCreateClip.graphql'
import deleteClip from '../../apollo/mutations/deleteClip.graphql'


const queryConfig = {
  options: ({clipId}) => ({
    variables: {
      clipId,
    },
  })
}



const editOrCreateConfig = {
  name: "editOrCreateClip",
}

const deleteConfig = {
  name: "deleteClip",
}

const query = graphql(ClipQuery, queryConfig)




export default compose(
  query,
  graphql(editOrCreateClip, editOrCreateConfig),
  graphql(deleteClip, deleteConfig)

)(
  ClipEditor
)
