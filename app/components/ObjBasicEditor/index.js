import { graphql, compose } from 'react-apollo'
import Component from './ObjBasicEditor'
import editOrCreateObj from '../../apollo/mutations/editOrCreateObj'

import gql from 'graphql-tag'

const query = gql`
  query ObjBasicQuery (
    $objId: ID!
  ) {
    obj (
      id: $objId
    ) {
      id
      title
      attribution
      culture
      dimensions
      medium
      date
      accessionNumber
      currentLocation
      creditLine
      text
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




export default compose(
  graphql(query, queryConfig),
  graphql(editOrCreateObj, editOrCreateObjConfig),
)(
  Component
)
