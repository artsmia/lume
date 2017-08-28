import { gql, graphql, compose } from 'react-apollo'
import AppItemList from './AppItemList'


const data = gql`
  query itemListData (
    $orgSub: String
    $search: String
  ) {
    organization (
      subdomain: $orgSub
    ) {
      id
      name
      subdomain

    }
    items (
      search: $search
    ) {
      id
      mainImage {
        id
      }
      organization {
        id
      }
    }
  }
`

const config = {
  options: ({orgSub, search}) => ({
    variables: {
      orgSub,
      search
    }
  })
}

export default compose(
  graphql(data, config),
)(
  AppItemList
)
