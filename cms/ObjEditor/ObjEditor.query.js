import gql from 'graphql-tag'
import {graphql } from 'react-apollo'
import fragment from './ObjEditor.fragment'

export const ObjQuery = gql`
  query ObjEditorQuery (
    $objId: ID!
  ) {
    obj (
      id: $objId
    ) {
      ...ObjEditorFragment
    }
  }

  ${fragment}

`


const queryConfig = {
  options: ({objId}) => ({
    variables: {
      objId
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(ObjQuery, queryConfig)
