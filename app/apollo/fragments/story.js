import gql from 'graphql-tag'
import objFragment from './obj'
import groupFragment from './group'
import imageFragment from './image'
import mediaFragment from './media'
import contentFragment from './content'

const fragment = gql`
  fragment StoryFragment on story {
    id
    title
    slug
    description
    template
    visibility
    previewImage {
      ...ImageFragment
    }
    groups {
      ...GroupFragment
    }
    contents {
      ...ContentFragment
    }
    relatedStories {
      id
      title
      slug
    }
  }

  ${groupFragment}
  ${imageFragment}
  ${mediaFragment}
  ${contentFragment}
`

export default fragment
