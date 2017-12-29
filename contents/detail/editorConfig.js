import {Input, Textarea, ChangeImage, DetailSelector} from '../../components/cms/DefaultEditors'

const detailConfig = {
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
    },
    {
      label: "Selection",
      graphqlType: "geometry",
      parent: "image0",
      arg: "geometry",
      Component: DetailSelector,
      position: "default"
    }
  ]
}




export default detailConfig
