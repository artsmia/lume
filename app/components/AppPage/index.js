import { graphql, compose } from 'react-apollo'
import AppPage from './AppPage'
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
  AppPage
)

export const PreviewAppObj = AppPage
