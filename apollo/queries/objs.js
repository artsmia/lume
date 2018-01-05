import gql from 'graphql-tag'
import {graphql } from 'react-apollo'
import objFragment from '../fragments/obj'

export const ObjsQuery = gql`
  query ObjsQuery (
    $filter: FilterInput
  ) {
    objs (
      filter: $filter
    ) {
      ...ObjFragment
    }

  }
  ${objFragment}

`


export const queryConfig = {
  options: ({subdomain}) => ({
    variables: {
      filter: {
        organization: {
          subdomain
        },
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


export default graphql(ObjsQuery, queryConfig)
