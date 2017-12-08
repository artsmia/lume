import {graphql, compose } from 'react-apollo'
import StoryList from './StoryList'

import gql from 'graphql-tag'

const query = gql`
  query allStories (
    $filter: Filter
    $orgSub: String
  ) {
    stories (
      filter: $filter
    ) {
      id
      title
      previewImage{
        id
      }
      updatedAt
    }
    organization (
      subdomain: $orgSub
    ) {
      id
    }
  }

`


const queryConfig = {
  options: ({orgSub}) => ({
    variables: {
      orgSub,
      filter: {
        orgSub,
        limit: 10,
        offset: 0,
        order: {
          column: "updatedAt",
          direction: "DESC"
        }
      }
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


const newQuery = graphql(query, queryConfig)


export default compose(
  newQuery,
)(
  StoryList
)
