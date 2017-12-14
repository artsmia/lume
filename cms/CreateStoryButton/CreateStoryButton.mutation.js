import {graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const CreateStoryMutation = gql`
  mutation createStory (
    $organization: OrganizationInput!
    $creatorId: ID!
  ) {
    createStory(
      organization: $organization
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
  props: ({mutate, ownProps: {subdomain, userId} }) => ({
    createStory: () => mutate({
      variables: {
        organization: {
          subdomain
        },
        creatorId: userId
      },

    }),
  }),
}

export default graphql(CreateStoryMutation, mutationConfig)
