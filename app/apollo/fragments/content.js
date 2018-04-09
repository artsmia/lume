import gql from 'graphql-tag'

const fragment = gql`
  fragment ContentFragment on content {
    id
    type
    index
    title
    description
    image0{
      id
      localId
    }
    image1{
      id
      localId
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
      id
      localId
    }
  }
`

export default fragment
