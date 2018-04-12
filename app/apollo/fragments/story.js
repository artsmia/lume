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
        localId
      }
      image1 {
        id
        localId
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
        localId
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
