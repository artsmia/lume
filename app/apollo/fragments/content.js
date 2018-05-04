import gql from 'graphql-tag'
import imageFragment from './image'
import mediaFragment from './media'
import objFragment from './obj'

const fragment = gql`
  fragment ContentFragment on content {
    id
    type
    index
    title
    description
    image0{
      ...ImageFragment
    }
    image1{
      ...ImageFragment
    }
    videoUrl
    geoJSON {
      type
      features {
        type
        geometry {
          type
          coordinates
        }
      }
    }
    obj {
      ...ObjFragment
    }
    additionalImages {
      ...ImageFragment
    }
    additionalMedias {
      ...MediaFragment
    }
  }
  ${imageFragment}
  ${mediaFragment}
  ${objFragment}

`

export default fragment
