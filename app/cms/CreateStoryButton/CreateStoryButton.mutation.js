import {graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const CreateStoryMutation = gql`
  mutation createStory (
    $organizationId: ID!
    $creatorId: ID!
  ) {
    createStory(
      organizationId: $organizationId
      creatorId: $creatorId
    ) {
      id
      organization {
        subdomain
      }
    }
  }
`

export const mutationConfig = {
  props: ({mutate, ownProps: {organizationId, userId} }) => ({
    createStory: () => mutate({
      variables: {
        organizationId,
        creatorId: userId
      },

    }),
  }),
}

export default graphql(CreateStoryMutation, mutationConfig)
