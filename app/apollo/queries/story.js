import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import storyFragment from '../fragments/story'

export const StoryQuery = gql`
  query StoryQuery (
    $storyId: ID
    $slugInput: StorySlugInput
  ) {
    story (
      id: $storyId
      slugInput: $slugInput
    ) {
      ...StoryFragment
    }
  }
  ${storyFragment}
`


const queryConfig = {
  options: ({storyId,subdomain,storySlug}) => {

    let variables = {}

    if (storyId){
      Object.assign(variables, {
        storyId
      })
    }

    if (subdomain && storySlug){
      Object.assign(variables, {
        slugInput: {
          slug: storySlug,
          organization: {
            subdomain
          }
        }
      })
    }

    return {
      variables
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(StoryQuery, queryConfig)
