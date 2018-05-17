import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const deleteStory = gql`
  mutation deleteStory($storyId: ID!) {
    deleteStory(id: $storyId)
  }
`

const mutationConfig = {
  props: ({ mutate, ownProps: { storyId } }) => ({
    deleteStory: () =>
      mutate({
        variables: {
          storyId
        },
        refetchQueries: ['StoriesQuery']
      })
  })
}

export default graphql(deleteStory, mutationConfig)
