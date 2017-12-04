import gql from 'graphql-tag'

const mutation = gql`
  mutation editOrCreateOrganization (
    $orgId: ID
    $newUserIds: [ID]
    $name: String
    $subdomain: String
    $customObjApiEnabled: Boolean
    $customObjApiEndpoint: String
  ) {
    editOrCreateOrganization (
      id: $orgId
      newUserIds: $newUserIds
      name: $name
      subdomain: $subdomain
      customObjApiEndpoint: $customObjApiEndpoint
      customObjApiEnabled: $customObjApiEnabled
    ) {
      id
      name
      subdomain
      customObjApiEnabled
      customObjApiEndpoint
    }
  }
`

export default mutation
