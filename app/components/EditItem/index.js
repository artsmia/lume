import { graphql, compose } from 'react-apollo'
import EditItem from './EditItem'
import query from './query.graphql'
import editOrCreateItem from '../../apollo/mutations/editOrCreateItem.graphql'
import deleteItem from '../../apollo/mutations/deleteItem.graphql'


const queryOptions = {
  options: ({userId, orgSub, itemId}) => ({
    variables: {
      itemId,
      userId,
      orgSub
    }
  })
}

export default compose(
  graphql(query, queryOptions),
  graphql(editOrCreateItem, {
    name: "editItem",
  }),
  graphql(deleteItem, {
    name: "deleteItem",
  })
)(
  EditItem
)
