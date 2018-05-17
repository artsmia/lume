import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const showSnack = gql`
  mutation EditSnack($message: String) {
    showSnack(message: $message) @client
  }
`

const showSnackConfig = {
  props({ mutate }) {
    return {
      showSnack(variables) {
        return mutate({
          variables
        })
      }
    }
  }
}

export default graphql(showSnack, showSnackConfig)
