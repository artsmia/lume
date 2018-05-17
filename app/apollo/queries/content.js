import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import contentFragment from '../fragments/content'

export const ContentQuery = gql`
  query ContentQuery($contentId: ID!) {
    content(id: $contentId) {
      ...ContentFragment
    }
  }
  ${contentFragment}
`

const queryConfig = {
  options: ({ contentId }) => ({
    variables: {
      contentId
    }
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  })
}

export default graphql(ContentQuery, queryConfig)
