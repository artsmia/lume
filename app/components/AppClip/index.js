import { graphql, compose } from 'react-apollo'
import AppClip from './AppClip'
import query from './query.graphql'

const config = {
  options: ({clipId}) => ({
    variables: {
      clipId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  AppClip
)

export const PreviewAppClip = AppClip
