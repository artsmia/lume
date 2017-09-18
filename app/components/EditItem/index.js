import { graphql, compose } from 'react-apollo'
import Component from './EditItem'
import query from './query.graphql'
import editOrCreateItem from '../../apollo/mutations/editOrCreateItem.graphql'
import deleteItem from '../../apollo/mutations/deleteItem.graphql'
import editOrCreateDetail from '../../apollo/mutations/editOrCreateDetail.graphql'

const queryOptions = {
  options: ({userId, orgSub, itemId}) => ({
    variables: {
      itemId,
      userId,
      orgSub
    }
  })
}

let EditItem = graphql(editOrCreateDetail, {
  name: "editDetail",
})(Component)

export default compose(
  graphql(query, queryOptions),
  graphql(editOrCreateItem, {
    name: "editItem",
  }),
  graphql(deleteItem, {
    name: "deleteItem",
  }),
)(
  EditItem
)
