import { graphql, compose } from 'react-apollo'
import EditThematic from './EditThematic'
import editOrCreateThematic from '../../apollo/mutations/editOrCreateThematic'
import editOrCreatePage from '../../apollo/mutations/editOrCreatePage'
import deleteThematic from '../../apollo/mutations/deleteThematic'
import gql from 'graphql-tag'

const query = gql`
  query ThematicQuery (
    $thematicId: ID!
    $userId: ID
    $orgSub: String
  ) {
    thematic (id: $thematicId) {
      id
      title
      previewImage {
        id
      }
      pages {
        id
        title
        index
      }
    }
    user (id: $userId) {
      id
      email
    }
    organization (
      orgSub: $orgSub
    ) {
      id
    }
  }
`


const queryOptions = {
  options: ({userId, orgSub, thematicId}) => ({
    variables: {
      thematicId,
      userId,
      orgSub
    }
  })
}

export default compose(
  graphql(query, queryOptions),
  graphql(editOrCreateThematic, {
    name: "editThematic",
  }),
  graphql(deleteThematic, {
    name: "deleteThematic",
  }),
  graphql(editOrCreatePage, {
    name: "editPage",
  }),
)(
  EditThematic
)
