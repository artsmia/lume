import { graphql, compose } from 'react-apollo'
import Component from './ItemBasicEditor'
import editOrCreateItem from '../../apollo/mutations/editOrCreateItem'

import gql from 'graphql-tag'

const query = gql`
  query ItemBasicQuery (
    $itemId: ID!
  ) {
    item (
      id: $itemId
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
  options: ({itemId}) => ({
    variables: {
      itemId,
    },
  })
}



const editOrCreateItemConfig = {
  name: "editOrCreateItem",
}




export default compose(
  graphql(query, queryConfig),
  graphql(editOrCreateItem, editOrCreateItemConfig),
)(
  Component
)
