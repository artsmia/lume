import {graphql, compose } from 'react-apollo'
import AppItemList from './AppItemList'
import gql from 'graphql-tag'

const query = gql`
  query itemListData (
    $search: String
    $orgSub: String
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
      organizations {
        id
      }
    }
  }
`


const config = {
  options: ({orgSub, search}) => ({
    variables: {
      orgSub,
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
  AppItemList
)
