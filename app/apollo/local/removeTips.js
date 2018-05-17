import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const mutation = gql`
  mutation RemoveTips($tips: Boolean) {
    removeTips(tips: $tips) @client
  }
`

const config = {
  props({ mutate }) {
    return {
      removeTips(variables) {
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
