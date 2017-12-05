import { graphql, compose } from 'react-apollo'
import Page from './Page'
import gql from 'graphql-tag'

const query = gql`
  query PageQuery (
    $pageId: ID!
  ) {
    page (
      id: $pageId
    ) {
      id
      index
      title
      text
      type
      mainImage {
        id
      }
      comparisonImage0 {
        id
      }
      comparisonImage1 {
        id
      }
      video
    }
  }

`

const config = {
  options: ({pageId}) => ({
    variables: {
      pageId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  Page
)

export const PreviewObj = Page
