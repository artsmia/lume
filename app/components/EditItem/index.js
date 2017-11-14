import { graphql, compose } from 'react-apollo'
import Component from './EditItem'
import editOrCreateItem from '../../apollo/mutations/editOrCreateItem'
import deleteItem from '../../apollo/mutations/deleteItem'
import editOrCreateDetail from '../../apollo/mutations/editOrCreateDetail'
import gql from 'graphql-tag'

const query = gql`
query editItemQuery (
  $itemId: ID!
  $userId: ID
  $orgSub: String
  $bookFilter: Filter
  $bookSearch: String
) {
  item (id: $itemId) {
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
    pullFromCustomApi
    mainImage {
      id
    }
    details {
      id
      index
      title
      image {
        id
        organization {
          id
        }
      }
    }
    relatedBooks {
      id
      title
    }
  }
  user (id: $userId) {
    id
    email
  }
  organization (
    subdomain: $orgSub
  ) {
    id
    subdomain
    customItemApiEnabled
    customItemApiEndpoint
  }
  books (
    filter: $bookFilter
    search: $bookSearch
    orgSub: $orgSub
  ) {
    id
    title
    previewImage {
      id
    }
  }

}


`


const queryOptions = {
  options: ({userId, orgSub, itemId}) => ({
    variables: {
      itemId,
      userId,
      orgSub,
      bookFilter: {
        limit: 10,
      }
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
