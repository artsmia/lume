import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
// import userFragment from '../fragments/user'

export const UsersQuery = gql`
  query UsersQuery($filter: FilterInput) {
    users(filter: $filter) {
      id
      name {
        given
        family
      }
      email
      picture
      role
    }
  }
`

export const queryConfig = {
  options: props => {
    const { subdomain } = props.router.query

    return {
      variables: {
        filter: {
          organization: {
            subdomain
          }
        }
      }
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  })
}

export default graphql(UsersQuery, queryConfig)
