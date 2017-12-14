import gql from 'graphql-tag'
import {graphql } from 'react-apollo'


export const StoryListQuery = gql`
  query StoryList (
    $filter: FilterInput
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
      organization {
        subdomain
      }
    }
  }

`


export const queryConfig = {
  options: ({organizationId}) => ({
    variables: {
      filter: {
        organizationId,
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


export default graphql(StoryListQuery, queryConfig)
