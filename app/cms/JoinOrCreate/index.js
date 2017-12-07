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
    $role: RoleEnum
  ) {
    editUserOrganization(
      userId: $userId
      organizationId: $organizationId
      role: $role
    ) {
      id
      subdomain
    }
  }
`

export default compose(
  graphql(query, queryConfig),
  graphql(joinOrganization, {
    name: "joinOrganization",
  })
)(
  JoinOrCreate
)
