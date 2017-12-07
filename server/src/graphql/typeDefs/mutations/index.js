import createContent from './createContent'
import createImage from './createImage'
import createOrganization from './createOrganization'
import createStory from './createStory'
import createVideo from './createVideo'
import deleteComparison from './deleteComparison'
import deleteCrop from './deleteCrop'
import deleteDetail from './deleteDetail'
import deleteMovie from './deleteMovie'
import deleteObj from './deleteObj'
import deletePicture from './deletePicture'
import deleteStory from './deleteStory'
import deleteVideo from './deleteVideo'
import editComparison from './editComparison'
import editCrop from './editCrop'
import editDetail from './editDetail'
import editMovie from './editMovie'
import editObj from './editObj'
import editOrganization from './editOrganization'
import editPicture from './editPicture'
import editStory from './editStory'
import editUserOrganization from './editUserOrganization'
import editVideo from './editVideo'

const mutations = [
  createContent,
  createImage,
  createOrganization,
  createStory,
  createVideo,
  deleteComparison,
  deleteCrop,
  deleteDetail,
  deleteMovie,
  deleteObj,
  deletePicture,
  deleteStory,
  deleteVideo,
  editComparison,
  editCrop,
  editDetail,
  editMovie,
  editObj,
  editOrganization,
  editPicture,
  editStory,
  editUserOrganization,
  editVideo
]


const rootMutation = `
  type Mutation {
    ${mutations.join(" ")}
  }
`

export default rootMutation
