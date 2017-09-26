import { graphql, compose } from 'react-apollo'
import Component from './ItemSettingsEditor'
import Query from './query.graphql'
import editOrCreateItem from '../../apollo/mutations/editOrCreateItem.graphql'
import deleteItem from '../../apollo/mutations/deleteItem.graphql'


const queryConfig = {
  options: ({itemId}) => ({
    variables: {
      itemId,
    },
  })
}



const editOrCreateItemConfig = {
  name: "editOrCreateItem",
}


const deleteItemConfig = {
  name: "deleteItem",
}


const query = graphql(Query, queryConfig)



export default compose(
  query,
  graphql(editOrCreateItem, editOrCreateItemConfig),
  graphql(deleteItem, deleteItemConfig),
)(
  Component
)
