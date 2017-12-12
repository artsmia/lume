import gql from 'graphql-tag'
import {graphql } from 'react-apollo'
import fragment from './DetailEditor.fragment'

export const DetailQuery = gql`
  query DetailEditorQuery (
    $detailId: ID!
  ) {
    detail (
      id: $detailId
    ) {
      ...DetailEditorFragment
    }
  }

  ${fragment}

`


const queryConfig = {
  options: ({detailId}) => ({
    variables: {
      detailId
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(DetailQuery, queryConfig)
