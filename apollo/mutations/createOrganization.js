import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


const createOrganizationMutation = gql`
  mutation createOrganization (
    $subdomain: String!
    $name: String!
    $creatorId: ID!
  ) {
    createOrganization(
      subdomain: $subdomain
      name: $name
      creatorId: $creatorId
    ) {
      id
      name
      subdomain
    }
  }
`

export default graphql(createOrganizationMutation, {
  name: "createOrganization"
})
