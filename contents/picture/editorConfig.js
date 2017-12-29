import {Input, Textarea, ChangeImage} from '../../components/cms/DefaultEditors'

const editorConfig = {
  editor: "default",
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
      label: "Image",
      graphqlType: "image",
      parent: "image0",
      arg: "image0Id",
      Component: ChangeImage,
      position: "default"
    }
  ]
}




export default editorConfig
