import {graphql, compose } from 'react-apollo'
import BrowseObjs from './BrowseObjs'
import newObj from '../../apollo/mutations/editOrCreateObj'

import gql from 'graphql-tag'

const query = gql`
  query allObjs (
    $orgSub: String
    $search: String
    $filter: Filter
  ) {
    objs (
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
  name: "newObj",
  // options: ({orgSub, search}) => ({
  //   optimisticResponse: {
  //     editOrCreateObj: {
  //       id: -1,
  //       title: "New Obj",
  //       attribution: "",
  //       medium: "",
  //       culture: "",
  //       dimensions: "",
  //       date: "",
  //       __typename: "Obj"
  //     }
  //   },
  //   update: (store, {data: {editOrCreateObj}}) => {
  //     let data = store.readQuery({
  //       query,
  //       variables: {
  //         orgSub,
  //         search
  //       }
  //     })
  //     data.objs.push(editOrCreateObj)
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
  graphql(newObj, mutationConfig)
)(
  BrowseObjs
)
