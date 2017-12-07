import {graphql, compose } from 'react-apollo'
import ObjList from './ObjList'
import gql from 'graphql-tag'

const query = gql`
  query objListData (
    $search: String
    $orgSub: String
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
  ObjList
)
