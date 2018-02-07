import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

const setSaveStatus = gql`
  mutation SetSaveStatus (
    $synced: Boolean
    $saving: Boolean
    $lastSave: String
  ) {
    setSaveStatus(
      synced: $synced
      saving: $saving
      lastSave: $lastSave
    ) @client
  }
`

const setSaveStatusConfig = {
  props({mutate}){
    return {
      setSaveStatus(variables){
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
