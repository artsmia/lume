import { graphql, compose } from 'react-apollo'
import Component from './ObjSettingsEditor'
import editOrCreateObj from '../../apollo/mutations/editOrCreateObj'
import deleteObj from '../../apollo/mutations/deleteObj'


import gql from 'graphql-tag'

const query = gql`
  query ObjSettingsQuery (
    $objId: ID!
  ) {
    obj (
      id: $objId
    ) {
      id
      pullFromCustomApi
      localId
    }
  }

`


const queryConfig = {
  options: ({objId}) => ({
    variables: {
      objId,
    },
  })
}



const editOrCreateObjConfig = {
  name: "editOrCreateObj",
}


const deleteObjConfig = {
  name: "deleteObj",
}




export default compose(
  graphql(query, queryConfig),
  graphql(editOrCreateObj, editOrCreateObjConfig),
  graphql(deleteObj, deleteObjConfig),
)(
  Component
)
