import { compose } from 'react-apollo'
import Component from './StoryEditor.component'
import query from '../../../apollo/queries/story'
import mutation from '../../../apollo/mutations/editStory'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(query, mutation)(ExportComponent)

ExportComponent = withRouter(ExportComponent)



export default ExportComponent
