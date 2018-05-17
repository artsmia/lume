import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import objFragment from '../fragments/obj'

export const ObjsQuery = gql`
  query ObjsQuery($filter: FilterInput) {
    objs(filter: $filter) {
      ...ObjFragment
    }
  }
  ${objFragment}
`

export const queryConfig = {
  options: ({
    router: {
      query: { subdomain }
    }
  }) => ({
    variables: {
      filter: {
        organization: {
          subdomain
        },
        limit: 20,
        offset: 0,
        order: {
          column: 'title',
          direction: 'DESC'
        }
      }
    }
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  })
}

export default graphql(ObjsQuery, queryConfig)
