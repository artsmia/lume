import {graphql, compose } from 'react-apollo'
import BrowseObjs from './BrowseObjs'
import newObj from '../../apollo/mutations/editOrCreateObj'

import gql from 'graphql-tag'

const query = gql`
  query allObjs (
    $subdomain: String
    $search: String
    $filter: Filter
  ) {
    objs (
      search: $search
      subdomain: $subdomain
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
      subdomain: $subdomain
    ) {
      id
    }
  }

`


const queryConfig = {
  options: ({subdomain}) => ({
    variables: {
      subdomain,
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
