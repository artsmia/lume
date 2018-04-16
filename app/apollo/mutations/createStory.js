import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import storyFragment from '../fragments/story'

export const CreateStoryMutation = gql`
  mutation createStory (
    $organization: OrganizationInput!
    $creatorId: ID!
    $title: String!
  ) {
    createStory(
      organization: $organization
      creatorId: $creatorId
      title: $title
    ) {
      ...StoryFragment
    }
  }
  ${storyFragment}
`

export const mutationConfig = {
  props: ({mutate, ownProps }) => {
    const {
      userId,
      router: {
        query: {
          subdomain
        }
      }
    } = ownProps
    return {
      ...ownProps,
      createStory: ({title}) => mutate({
        variables: {
          organization: {
            subdomain
          },
          creatorId: userId,
          title
        },
        refetchQueries: [
          "StoriesQuery"
        ]
      }),
    }
  },
}

export default graphql(CreateStoryMutation, mutationConfig)
