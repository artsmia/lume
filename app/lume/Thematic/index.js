import { graphql, compose } from 'react-apollo'
import Thematic from './Thematic'
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
  Thematic
)

export const PreviewObj = Thematic
