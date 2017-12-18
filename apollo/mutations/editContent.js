import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import contentFragment from '../fragments/content'

const editContent = gql`
  mutation editContent (
    $contentId: ID!
    $image0Id: ID
    $title: String
    $description: String
  ) {
    editContent(
      id: $contentId
      title: $title
      description: $description
      image0Id: $image0Id
    ) {
      ...ContentFragment
    }
  }
  ${contentFragment}
`

const mutationConfig = {
  props: ({mutate, ownProps: {contentId} }) => ({
    editContent: (variables) => mutate({
      variables: {
        contentId,
        ...variables
      },
    }),
  }),

}

export default graphql(editContent, mutationConfig)
