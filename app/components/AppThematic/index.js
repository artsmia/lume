import { graphql, compose } from 'react-apollo'
import AppThematic from './AppThematic'
import gql from 'graphql-tag'

const query = gql`
  query ThematicQuery (
    $thematicId: ID!
  ) {
    thematic (
      id: $thematicId
    ) {
      id
      title
      pages {
        id
        index
      }
    }
  }

`


const config = {
  options: ({thematicId}) => ({
    variables: {
      thematicId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  AppThematic
)

export const PreviewAppObj = AppThematic
