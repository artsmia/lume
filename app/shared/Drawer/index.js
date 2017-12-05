import Drawer from './Drawer'
import {graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
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
  graphql(query, options)
)(Drawer)
