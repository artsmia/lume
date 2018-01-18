import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import storyFragment from '../fragments/story'

export const StoryQuery = gql`
  query StoryQuery (
    $storyId: ID!
  ) {
    story (
      id: $storyId
    ) {
      ...StoryFragment
    }
  }
  ${storyFragment}
`


const queryConfig = {
  options: (props) => {
    return {
      variables: {
        storyId: props.storyId
      },
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(StoryQuery, queryConfig)
