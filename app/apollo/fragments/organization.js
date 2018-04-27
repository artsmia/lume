import gql from 'graphql-tag'
import categoryFragment from './category'
import imageFragment from './image'


const fragment = gql`
  fragment OrganizationFragment on organization {
    id
    name
    subdomain
    emailDomain
    customImageApiEnabled
    customImageEndpoint
    customObjApiEndpoint
    customObjApiEnabled
    newUsersRequireApproval
    customAnalyticsEnabled
    customAnalyticsId
    categories {
      ...CategoryFragment
    }
    orgImage {
      ...ImageFragment
    }
    locationEnabled
    locationImage {
      ...ImageFragment
    }
  }
  ${categoryFragment}
  ${imageFragment}
`

export default fragment
