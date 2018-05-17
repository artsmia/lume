import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const setSaveStatus = gql`
  mutation SetSaveStatus($synced: Boolean) {
    setSaveStatus(synced: $synced) @client
  }
`

const setSaveStatusConfig = {
  props({ mutate }) {
    return {
      setSaveStatus(variables) {
        return mutate({
          variables: {
            __typename: 'SaveStatus',
            ...variables
          }
        })
      }
    }
  }
}

export default graphql(setSaveStatus, setSaveStatusConfig)
