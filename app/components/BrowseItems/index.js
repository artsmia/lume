import { gql, graphql, compose } from 'react-apollo'
import BrowseItems from './BrowseItems'

const query = gql`
  query browseItems (
    $orgSub: String
    $userId: ID
  ) {
    organization (
      subdomain: $orgSub
    ) {
      id
      name
      items {
        id
        title
      }
    }
    user (
      id: $userId
    ) {
      id
    }
  }
`

const queryConfig = {
  options: ({orgSub, userId}) => ({
    variables: {
      orgSub,
      userId
    }
  })
}

const mutation = gql`
  mutation editOrCreateItem (
    $newOrganizationIds: [ID]
  ) {
    editOrCreateItem (
      newOrganizationIds: $newOrganizationIds
    ) {
      id
    }
  }
`


const mutationConfig = {
  name: "newItem",
}

export default compose(
  graphql(query, queryConfig),
  graphql(mutation, mutationConfig)
)(
  BrowseItems
)
