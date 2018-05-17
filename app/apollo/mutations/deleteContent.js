import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const deleteContent = gql`
  mutation deleteContent($contentId: ID!) {
    deleteContent(id: $contentId)
  }
`

const mutationConfig = {
  props: ({ mutate, ownProps: { contentId } }) => ({
    deleteContent: () =>
      mutate({
        variables: {
          contentId
        },
        refetchQueries: ['StoryQuery']
      })
  })
}

export default graphql(deleteContent, mutationConfig)
