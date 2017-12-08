import {graphql, compose } from 'react-apollo'
import ObjList from './ObjList'
import gql from 'graphql-tag'

const query = gql`
  query objListData (
    $search: String
    $subdomain: String
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
      organizations {
        id
      }
    }
  }
`


const config = {
  options: ({subdomain, search}) => ({
    variables: {
      subdomain,
      search,
      filter: {
        limit: 20
      }
    }
  })
}

export default compose(
  graphql(query, config),
)(
  ObjList
)
