import gql from 'graphql-tag'

const fragment = gql`
  fragment ContentFragment on content {
    id
    title
    description
    image0{
      id
    }
  }
`

export default fragment
