import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import contentFragment from '../fragments/content'

const editContent = gql`
  mutation editContent($content: ContentInput!) {
    editContent(content: $content) {
      ...ContentFragment
    }
  }
  ${contentFragment}
`

const mutationConfig = {
  props: ({ mutate, ownProps: { contentId } }) => ({
    editContent: variables =>
      mutate({
        variables: {
          content: {
            ...variables,
            id: contentId
          }
        }
      })
  })
}

export default graphql(editContent, mutationConfig)
