import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {StoryQuery} from '../Editor/Editor.query'

const createContent = gql`
  mutation createContent (
    $storyId: ID!
    $type: ContentTypeEnum!
  ) {
    createContent(
      storyId: $storyId
      type: $type
    ) {
      id
      index
      type
      title
    }
  }
`

const mutationConfig = {
  props: ({mutate, ownProps: {storyId, type} }) => ({
    createContent: () => mutate({
      variables: {
        storyId,
        type
      },
      update: (proxy, {data: {createContent}}) => {

        let data = proxy.readQuery({
          query:StoryQuery,
          variables: {
            storyId
          }
        })

        data.story.contents.push(createContent)

        console.log(data)

        proxy.writeQuery({ query: StoryQuery, data })
      }
    }),
  }),

}

export default graphql(createContent, mutationConfig)
