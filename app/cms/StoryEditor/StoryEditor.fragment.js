import gql from 'graphql-tag'

const fragment = gql`
  fragment StoryEditorFragment on Story {
    id
    title
    description
    template
    previewImage{
      id
    }
  }
`

export default fragment
