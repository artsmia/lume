import BaseEditor from '../../components/cms/DefaultEditors/BaseEditor'
import {Input, Textarea, VideoUrl} from '../../components/cms/DefaultEditors'

export default (props) => (
  <BaseEditor
    fields={[
      {
        label: "Title",
        name: "title",
        type: "string",
        Component: Input,
        defaultValue: ""
      },
      {
        label: "Description",
        name: "description",
        type: "string",
        Component: Textarea,
        defaultValue: ""
      },{
        label: "Video",
        name: "videoUrl",
        type: "string",
        Component: VideoUrl,
        defaultValue: ""
      }
    ]}
    {...props}
  />
)
