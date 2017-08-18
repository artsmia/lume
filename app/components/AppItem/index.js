import { gql, graphql, compose } from 'react-apollo'
import AppItem from './AppItem'


const data = gql`
  query organization (
    $orgSub: String
    $itemId: ID!
  ) {
    organization (
      subdomain: $orgSub
    ) {
      id
    }
    item (
      id: $itemId
    ) {
      id
      title
      medium
      artist
      dated
      mainImage {
        id
      }
    }
  }
`

const config = {
  options: ({orgSub, itemId}) => ({
    variables: {
      orgSub,
      itemId
    }
  })
}

export default compose(
  graphql(data, config),
)(
  AppItem
)

export const PreviewAppItem = AppItem
