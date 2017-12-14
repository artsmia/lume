import gql from 'graphql-tag'
import {graphql } from 'react-apollo'
import fragment from './MovieEditor.fragment'

export const MovieQuery = gql`
  query MovieEditorQuery (
    $movieId: ID!
  ) {
    movie (
      id: $movieId
    ) {
      ...MovieEditorFragment
    }
  }

  ${fragment}

`


const queryConfig = {
  options: ({movieId}) => ({
    variables: {
      movieId
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(MovieQuery, queryConfig)
