import gql from 'graphql-tag'
import {graphql } from 'react-apollo'
import fragment from './PictureEditor.fragment'

export const PictureQuery = gql`
  query PictureEditorQuery (
    $pictureId: ID!
  ) {
    picture (
      id: $pictureId
    ) {
      ...PictureEditorFragment
    }
  }

  ${fragment}

`


const queryConfig = {
  options: ({pictureId}) => ({
    variables: {
      pictureId
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(PictureQuery, queryConfig)
