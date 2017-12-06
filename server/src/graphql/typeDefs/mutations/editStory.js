const editStory = `
  editStory(
    id: ID!
    title: String
    description: String
    previewImageId: ID
    template: TemplateEnum
    visibility: VisibilityEnum
  ): Story
`

export default editStory
