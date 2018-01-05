import BaseEditor from '../../components/cms/DefaultEditors/BaseEditor'
import {Input, Textarea, ChangeImage} from '../../components/cms/DefaultEditors'

export default (props) => (
  <BaseEditor
    fields={[
      {
        label: "Title",
        type: "string",
        name: "title",
        Component: Input,
        defaultValue: ""
      },
      {
        label: "Description",
        type: "string",
        name: "description",
        Component: Textarea,
        defaultValue: ""
      },
      {
        label: "Image",
        name: "image0Id",
        parent: "image0",
        type: "image",
        Component: ChangeImage,
        defaultValue: undefined
      },
      {
        label: "Image",
        name: "image1Id",
        parent: "image1",
        type: "image",
        Component: ChangeImage,
        defaultValue: undefined
      },
    ]}
    {...props}
  />
)
