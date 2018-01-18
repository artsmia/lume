import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import storyFragment from '../fragments/story'

export const CreateStoryMutation = gql`
  mutation createStory (
    $organization: OrganizationInput!
    $creatorId: ID!
  ) {
    createStory(
      organization: $organization
      creatorId: $creatorId
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
      createStory: () => mutate({
        variables: {
          organization: {
            subdomain
          },
          creatorId: userId
        },
      }),
    }
  },
}

export default graphql(CreateStoryMutation, mutationConfig)
