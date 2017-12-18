import {DefaultInput, DefaultTextarea} from '../../cms/DefaultEditors'
import ChangeImage from '../../cms/DefaultEditors/ChangeImage'

const editorConfig = {
  editor: "default",
  fields: [
    {
      label: "Title",
      graphqlType: "String",
      arg: "title",
      Component: DefaultInput,
      position: "default"
    },
    {
      label: "Description",
      graphqlType: "String",
      arg: "description",
      Component: DefaultTextarea,
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
