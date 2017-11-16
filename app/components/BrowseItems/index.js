import {graphql, compose } from 'react-apollo'
import BrowseItems from './BrowseItems'
import newItem from '../../apollo/mutations/editOrCreateItem'

import gql from 'graphql-tag'

const query = gql`
  query allItems (
    $orgSub: String
    $search: String
    $filter: Filter
  ) {
    items (
      search: $search
      orgSub: $orgSub
      filter: $filter
    ) {
      id
      title
      mainImage {
        id
      }
      updatedAt
    }
    organization (
      orgSub: $orgSub
    ) {
      id
    }
  }

`


const queryConfig = {
  options: ({orgSub}) => ({
    variables: {
      orgSub,
      filter: {
        limit: 10,
        order: {
          column: "title",
          direction: "ASC"
        }
      }
    },
  })
}



const mutationConfig = {
  name: "newItem",
  // options: ({orgSub, search}) => ({
  //   optimisticResponse: {
  //     editOrCreateItem: {
  //       id: -1,
  //       title: "New Item",
  //       attribution: "",
  //       medium: "",
  //       culture: "",
  //       dimensions: "",
  //       date: "",
  //       __typename: "Item"
  //     }
  //   },
  //   update: (store, {data: {editOrCreateItem}}) => {
  //     let data = store.readQuery({
  //       query,
  //       variables: {
  //         orgSub,
  //         search
  //       }
  //     })
  //     data.items.push(editOrCreateItem)
  //     store.writeQuery({
  //       query,
  //       variables: {
  //         orgSub,
  //         search
  //       },
  //       data
  //     })
  //   }
  // })
}


const newQuery = graphql(query, queryConfig)




export default compose(
  newQuery,
  graphql(newItem, mutationConfig)
)(
  BrowseItems
)
