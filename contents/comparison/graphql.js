import {
  GraphQLID
} from 'graphql'
import imageType from '../../graphql/types/image'

export const fields = {
  image1: {
    type: imageType,
    async resolve(src){
      return await src.getImage1()
    }
  }
}

export const args = {
  image1Id: {
    type: GraphQLID
  }
}
