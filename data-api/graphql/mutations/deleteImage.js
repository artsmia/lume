import { GraphQLID, GraphQLString, GraphQLNonNull } from "graphql"
import resolve from "../resolvers/deleteImage"
import imageType from "../types/image"

const deleteImage = {
  name: "deleteImage",
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve
}

export default deleteImage
