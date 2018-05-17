import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import objFragment from '../fragments/obj'

export const ObjQuery = gql`
  query ObjQuery($objId: ID!) {
    obj(id: $objId) {
      ...ObjFragment
    }
  }
  ${objFragment}
`

const queryConfig = {
  options: ({ objId }) => ({
    variables: {
      objId
    }
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  })
}

export default graphql(ObjQuery, queryConfig)
