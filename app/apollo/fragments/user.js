import gql from 'graphql-tag'

const fragment = gql`
  fragment UserFragment on user {
    id
    name {
      given
      family
    }
    email
    picture
    role
  }
`

export default fragment
