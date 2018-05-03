import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import objFragment from '../fragments/obj'
import {ObjsQuery} from '../queries/objs'

export const CreateObjMutation = gql`
  mutation createObj (
    $organization: OrganizationInput!
    $localId: String
    $pullFromCustomApi: Boolean
  ) {
    createObj(
      organization: $organization
      localId: $localId
      pullFromCustomApi: $pullFromCustomApi
    ) {
      ...ObjFragment
    }
  }
  ${objFragment}
`

export const mutationConfig = {
  props: ({mutate, ownProps: {router: {query: {subdomain}}} }) => ({
    createObj: (variables) => {

      return mutate({
        variables: {
          organization: {
            subdomain
          },
          localId: variables.localId,
          pullFromCustomApi: variables.pullFromCustomApi
        },
      })
    }
  }),
}

export default graphql(CreateObjMutation, mutationConfig)
