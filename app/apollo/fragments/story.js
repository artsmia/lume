import gql from 'graphql-tag'
import objFragment from './obj'
import groupFragment from './group'
import imageFragment from './image'
import mediaFragment from './media'


const fragment = gql`
  fragment StoryFragment on story {
    id
    title
    slug
    description
    template
    visibility
    previewImage{
      ...ImageFragment
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
        ...ImageFragment

      }
      image1 {
        ...ImageFragment

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
        ...ImageFragment
      }
      additionalMedias {
        ...MediaFragment
      }
    }
    relatedStories {
      id
      title
      slug
    }
  }

  ${objFragment}
  ${groupFragment}
  ${imageFragment}
  ${mediaFragment}

`

export default fragment
