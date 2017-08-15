import Template from './Template'
import { gql, graphql, compose } from 'react-apollo'

const queries = gql`
  query template ($userId: ID) {
    user  (
      id: $userId
    ) {
      id
      email
    }
  }
`

const options = {
  options: ({userId}) => ({
    variables: {
      userId
    }
  })
}

export default compose(
  graphql(queries, options)
)(Template)
