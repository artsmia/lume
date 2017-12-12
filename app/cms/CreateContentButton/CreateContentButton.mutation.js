import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {StoryQuery} from '../Editor/Editor.query'

const createContent = gql`
  mutation createContent (
    $storyId: ID!
    $type: ContentEnum!
  ) {
    createContent(
      storyId: $storyId
      type: $type
    ) {
      ... on Comparison {
        id
        index
      }

      ... on Detail {
        id
        index
      }

      ... on Movie {
        id
        index
      }

      ... on Obj {
        id
        index
      }

      ... on Picture {
        id
        index
      }
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

        proxy.writeQuery({ query: StoryQuery, data })
      }
    }),
  }),

}

export default graphql(createContent, mutationConfig)
