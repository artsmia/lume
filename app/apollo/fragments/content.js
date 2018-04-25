import gql from 'graphql-tag'
import imageFragment from './image'

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
    geometry {
      type
      coordinates
    }
    obj {
      id
    }
    additionalImages {
      ...ImageFragment
    }
  }
  ${imageFragment}

`

export default fragment
