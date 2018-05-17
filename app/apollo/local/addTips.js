import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const mutation = gql`
  mutation AddTips($tips: Boolean) {
    addTips(tips: $tips) @client
  }
`

const config = {
  props({ mutate }) {
    return {
      addTips(variables) {
        return mutate({
          variables: {
            __typename: 'ToolTips',
            ...variables
          }
        })
      }
    }
  }
}

export default graphql(mutation, config)
