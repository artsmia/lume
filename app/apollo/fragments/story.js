import gql from 'graphql-tag'
import objFragment from './obj'
import groupFragment from './group'


const fragment = gql`
  fragment StoryFragment on story {
    id
    title
    description
    template
    visibility
    previewImage{
      id
      localId
    }
    groups {
      ...GroupFragment
    }
    contents {
      id
      type
      index
      title
      description
      image0 {
        id
      }
      image1 {
        id
      }
      geometry {
        type
        coordinates
      }
      obj {
        ...ObjFragment
      }
      videoUrl
      additionalImages {
        id
      }
    }
    relatedStories {
      id
      title
    }
  }

  ${objFragment}
  ${groupFragment}
`

export default fragment
