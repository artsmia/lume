import gql from 'graphql-tag'
import {graphql } from 'react-apollo'


export const PictureQuery = gql`
  query PictureEditorQuery (
    $pictureId: ID!
  ) {
    picture (
      id: $pictureId
    ) {
      id
      title
      description

    }
  }

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
