import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ImagesQuery } from '../queries/images'

const deleteImage = gql`
  mutation deleteImage($id: ID!) {
    deleteImage(id: $id)
  }
`

const mutationConfig = {
  props: ({ mutate, ownProps }) => ({
    deleteImage: ({ id }) =>
      mutate({
        variables: {
          id
        },
        // update: store => {
        //   let data = store.readQuery({
        //     query: ImagesQuery,
        //     variables: ownProps.variables
        //   })
        //
        //   console.log(data)
        //
        //   data.images = data.images.filter(image => image.id !== id)
        //
        //   store.writeQuery({
        //     query: ImagesQuery,
        //     data
        //   })
        //
        //   console.log(
        //     store.readQuery({
        //       query: ImagesQuery,
        //       variables: ownProps.variables
        //     })
        //   )
        // }
        refetchQueries: ['ImagesQuery']
      })
  })
}

export default graphql(deleteImage, mutationConfig)
