import { graphql, compose } from 'react-apollo'
import Component from './ItemSettingsEditor'
import editOrCreateItem from '../../apollo/mutations/editOrCreateItem'
import deleteItem from '../../apollo/mutations/deleteItem'


import gql from 'graphql-tag'

const query = gql`
  query ItemSettingsQuery (
    $itemId: ID!
  ) {
    item (
      id: $itemId
    ) {
      id
      pullFromCustomApi
      localId
    }
  }

`


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




export default compose(
  graphql(query, queryConfig),
  graphql(editOrCreateItem, editOrCreateItemConfig),
  graphql(deleteItem, deleteItemConfig),
)(
  Component
)
