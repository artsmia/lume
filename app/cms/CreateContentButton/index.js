import CreateContentButton from './CreateContentButton'
import {graphql, compose } from 'react-apollo'
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
      id
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
      optimisticResponse: {
        __typename: "Mutation",
        createContent: {
          __typename: "type",
          id: "optimistic"
        }
      },
      update: (proxy, {data: {createContent}}) => {

        console.log("createContent", createContent)

        let data = proxy.readQuery({
          query:StoryQuery,
          variables: {
            storyId
          }
        })

        console.log("data", data)

        data.story.contents.push(createContent)

        proxy.writeQuery({ query: StoryQuery, data })
      }
    }),
  }),

}

export default graphql(createContent, mutationConfig)(CreateContentButton)
