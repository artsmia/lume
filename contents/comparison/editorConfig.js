import {Input, Textarea, ChangeImage} from '../../components/cms/DefaultEditors'

const editorConfig = {
  Editor: "default",
  fields: [
    {
      label: "Title",
      graphqlType: "String",
      arg: "title",
      Component: Input,
      position: "default"
    },
    {
      label: "Description",
      graphqlType: "String",
      arg: "description",
      Component: Textarea,
      position: "default"
    },
    {
      label: "Image0",
      graphqlType: "image",
      parent: "image0",
      arg: "image0Id",
      Component: ChangeImage,
      position: "default"
    },
    {
      label: "Image1",
      graphqlType: "image",
      parent: "image1",
      arg: "image1Id",
      Component: ChangeImage,
      position: "default"
    }
  ]
}




export default editorConfig
