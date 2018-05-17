import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import imageFragment from '../fragments/image'

export const ImagesQuery = gql`
  query ImagesQuery($filter: FilterInput) {
    images(filter: $filter) {
      ...ImageFragment
    }
  }
  ${imageFragment}
`

const queryOptions = {
  options: props => {
    const { subdomain } = props.router.query
    return {
      variables: {
        filter: {
          limit: 20,
          organization: {
            subdomain
          },
          order: [
            {
              direction: 'DESC',
              column: 'createdAt'
            }
          ]
        }
      }
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  })
}

export default graphql(ImagesQuery, queryOptions)
