import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import fragment from './MovieEditor.fragment'


const editMovie = gql`
  mutation editMovie (
    $movieId: ID!
    $title: String
    $description: String
  ) {
    editMovie(
      id: $movieId
      title: $title
      description: $description
    ) {
      ...MovieEditorFragment
    }
  }

  ${fragment}
`

const mutationConfig = {
  props: ({mutate, ownProps: {movieId} }) => ({
    editMovie: (variables) => mutate({
      variables: {
        movieId,
        ...variables
      }
    }),
  }),

}

const editVideo = gql`
  mutation editVideo (
    $videoId: ID!
    $title: String
    $url: String
  ) {
    editVideo(
      id: $videoId
      title: $title
      url: $url
    ) {
      id
      title
      url
    }
  }

`

const videoMutationConfig = {
  props: ({mutate, ownProps }) => ({
    editVideo: (variables) => mutate({
      variables
    }),
  }),
}

export const videoMutation = graphql(editVideo, videoMutationConfig)

export default graphql(editMovie, mutationConfig)
