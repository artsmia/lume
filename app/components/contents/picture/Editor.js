import BaseEditor from '../../cms/DefaultEditors/BaseEditor'
import {Input, Textarea, ChangeImage} from '../../cms/DefaultEditors'

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
        label: "Image",
        name: "image0Id",
        parent: "image0",
        type: "image",
        Component: ChangeImage,
        defaultValue: undefined
      }
    ]}
    {...props}
  />
)
