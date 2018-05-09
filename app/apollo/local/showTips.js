import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

const showTips = gql`
  mutation ShowTips (
    $show: Boolean
  ) {
    showTips(
      show: $show
    ) @client
  }
`

const config = {
  props({mutate}){
    return {
      showTips(variables){
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

export default graphql(showTips, config)
