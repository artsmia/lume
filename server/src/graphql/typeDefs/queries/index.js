import comparison from './comparison'
import contents from './contents'
import crop from './crop'
import detail from './detail'
import group from './group'
import image from './image'
import images from './images'
import movie from './movie'
import obj from './obj'
import organization from './organization'
import organizations from './organizations'
import picture from './picture'
import stories from './stories'
import story from './story'
import user from './user'
import video from './video'
import videos from './videos'


const queries = [
  comparison,
  contents,
  crop,
  detail,
  group,
  image,
  images,
  movie,
  obj,
  organization,
  organizations,
  picture,
  stories,
  story,
  user,
  video,
  videos
]

const rootQuery = `
  type Query {
    ${queries.join(" ")}
  }
`

export default rootQuery
