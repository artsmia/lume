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
        offset: 0,
        order: {
          column: "updatedAt",
          direction: "DESC"
        }
      }
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}



const mutationConfig = {
  name: "newObj",
}


const newQuery = graphql(query, queryConfig)


export default compose(
  newQuery,
  graphql(newObj, mutationConfig)
)(
  BrowseObjs
)
