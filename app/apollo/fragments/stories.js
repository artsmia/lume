import gql from 'graphql-tag'

const fragment = gql`
  fragment StoriesFragment on story {
    id
    title
    slug
    description
    previewImage{
      id
      localId
    }
    updatedAt
    template
  }
`

export default fragment
