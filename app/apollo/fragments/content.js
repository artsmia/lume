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
    }
    image1{
      id
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
    }
  }
`

export default fragment
