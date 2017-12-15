import gql from 'graphql-tag'

const fragment = gql`
  fragment StoryFragment on story {
    id
    title
    description
    previewImage{
      id
    }
    contents {
      id
      type
      index
    }
  }
`

export default fragment
