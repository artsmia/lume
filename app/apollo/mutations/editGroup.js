import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import groupFragment from '../fragments/group'

const editGroup = gql`
  mutation editGroup(
    $id: ID!
    $title: String
    $slug: String
    $description: String
    $imageId: ID
  ) {
    editGroup(
      id: $id
      title: $title
      description: $description
      imageId: $imageId
      slug: $slug
    ) {
      ...GroupFragment
    }
  }
  ${groupFragment}
`

const mutationConfig = {
  props: ({ mutate, ownProps: { groupId } }) => ({
    editGroup: group =>
      mutate({
        variables: {
          ...group,
          id: groupId
        }
      })
  })
}

export default graphql(editGroup, mutationConfig)
