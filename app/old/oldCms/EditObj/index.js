import { graphql, compose } from 'react-apollo'
import Component from './EditObj'
import editOrCreateObj from '../../apollo/mutations/editOrCreateObj'
import deleteObj from '../../apollo/mutations/deleteObj'
import editOrCreateDetail from '../../apollo/mutations/editOrCreateDetail'
import gql from 'graphql-tag'

const query = gql`
query editObjQuery (
  $objId: ID!
  $userId: ID
  $subdomain: String
  $thematicFilter: Filter
  $thematicSearch: String
) {
  obj (id: $objId) {
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
    relatedThematics {
      id
      title
    }
  }
  user (id: $userId) {
    id
    email
  }
  organization (
    subdomain: $subdomain
  ) {
    id
    subdomain
    customObjApiEnabled
    customObjApiEndpoint
  }
  thematics (
    filter: $thematicFilter
    search: $thematicSearch
    subdomain: $subdomain
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
  options: ({userId, subdomain, objId}) => ({
    variables: {
      objId,
      userId,
      subdomain,
      thematicFilter: {
        limit: 10,
      }
    }
  })
}

let EditObj = graphql(editOrCreateDetail, {
  name: "editDetail",
})(Component)

export default compose(
  graphql(query, queryOptions),
  graphql(editOrCreateObj, {
    name: "editObj",
  }),
  graphql(deleteObj, {
    name: "deleteObj",
  }),
)(
  EditObj
)
