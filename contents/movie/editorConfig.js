import {Input, Textarea, VideoUrl} from '../../cms/DefaultEditors'

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
      label: "Video",
      graphqlType: "String",
      arg: "videoUrl",
      Component: VideoUrl,
      position: "default"
    }
  ]
}




export default editorConfig
