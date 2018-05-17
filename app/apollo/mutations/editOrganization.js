import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import organizationFragment from '../fragments/organization'

const editOrganization = gql`
  mutation EditOrganization(
    $id: ID!
    $name: String
    $newUsersRequireApproval: Boolean
    $customObjApiEnabled: Boolean
    $customObjApiEndpoint: String
    $customAnalyticsEnabled: Boolean
    $customAnalyticsId: String
    $orgImageId: ID
    $locationImageId: ID
    $objSearchEndpoint: String
    $imageSearchEndpoint: String
  ) {
    editOrganization(
      id: $id
      name: $name
      newUsersRequireApproval: $newUsersRequireApproval
      customObjApiEnabled: $customObjApiEnabled
      customObjApiEndpoint: $customObjApiEndpoint
      customAnalyticsEnabled: $customAnalyticsEnabled
      customAnalyticsId: $customAnalyticsId
      orgImageId: $orgImageId
      locationImageId: $locationImageId
      objSearchEndpoint: $objSearchEndpoint
      imageSearchEndpoint: $imageSearchEndpoint
    ) {
      ...OrganizationFragment
    }
  }
  ${organizationFragment}
`

const mutationConfig = {
  props: ({ mutate }) => ({
    editOrganization: variables =>
      mutate({
        variables: {
          ...variables
        }
      })
  })
}

export default graphql(editOrganization, mutationConfig)
