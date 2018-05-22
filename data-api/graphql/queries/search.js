// import {
//   GraphQLObjectType,
//   GraphQLID,
//   GraphQLList,
//   GraphQLNonNull
// } from 'graphql'
// import {SearchResult} from '../types/unions'
// import { StorySlugInput } from '../types/inputs'
// import Story from '../../db/models/story'
//
// const search = {
//   name: 'search',
//   type: SearchResult,
//   args: {
//     id: {
//       type: GraphQLID
//     },
//   },
//   resolve: async(src, args, ctx) => {
//     try {
//       let story = await Story.findOne({
//         where: {
//           id: args.id
//         }
//       })
//
//       return story
//     } catch (ex) {
//       console.error(ex)
//     }
//   }
// }
//
// export default search
