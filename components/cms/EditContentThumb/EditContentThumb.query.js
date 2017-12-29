import gql from 'graphql-tag'
import {graphql } from 'react-apollo'


const ContentThumbQuery = gql`
  query ContentThumbQuery (
    $contentId: ID!
  ) {
    content (
      id: $contentId
    ) {
      id
      title
      index
      type
    }
  }

`


const queryConfig = {
  options: ({contentId}) => ({
    variables: {
      contentId,
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(ContentThumbQuery, queryConfig)
