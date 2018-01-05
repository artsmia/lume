import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import objFragment from '../fragments/obj'

export const CreateObjMutation = gql`
  mutation createObj (
    $organization: OrganizationInput!
  ) {
    createObj(
      organization: $organization
    ) {
      ...ObjFragment
    }
  }
  ${objFragment}
`

export const mutationConfig = {
  props: ({mutate, ownProps: {subdomain} }) => ({
    createObj: () => mutate({
      variables: {
        organization: {
          subdomain
        },
      },
    }),
  }),
}

export default graphql(CreateObjMutation, mutationConfig)
