import Template from './Template'
import {graphql, compose } from 'react-apollo'
import query from './query.graphql'

const options = {
  options: ({userId}) => ({
    variables: {
      userId
    }
  })
}

export default compose(
  graphql(query, options)
)(Template)
