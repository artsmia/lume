import {graphql } from 'react-apollo'
import gql from 'graphql-tag'

const deleteGroup = gql`
  mutation deleteGroup (
    $groupId: ID!
  ) {
    deleteGroup(
      id: $groupId
    )
  }
`

const mutationConfig = {
  props: ({mutate, ownProps: {groupId} }) => ({
    deleteGroup: () => mutate({
      variables: {
        groupId,
      },
      refetchQueries: [
        "CategoryQuery"
      ]
    }),
  }),

}

export default graphql(deleteGroup, mutationConfig)
