import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import JoinOrCreate from './JoinOrCreate'

const query = gql`
  query organizations {
    organizations {
      id
      name
      subdomain
    }
  }
`

const queryConfig = {
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}




const joinOrganization = gql`
  mutation joinOrganization (
    $userId: ID!
    $organizationId: ID!
  ) {
    editUserOrganization(
      userId: $userId
      organizationId: $organizationId
    ) {
      id
      organizations {
        id
        subdomain
        role
      }
    }
  }
`

let Component = graphql(joinOrganization, {
  name: "joinOrganization"
})(JoinOrCreate)

const createOrganization = gql`
  mutation createOrganization (
    $subdomain: String
    $name: String
  ) {
    createOrganization(
      subdomain: $subdomain
      name: $name
    ) {
      id
      name
      subdomain
    }
  }
`


export default compose(
  graphql(query, queryConfig),
  graphql(createOrganization, {
    name: "createOrganization",
  })
)(
  Component
)
