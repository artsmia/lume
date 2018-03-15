import { compose } from 'react-apollo'
import Component from './StoryEditor.component'
import query from '../../../apollo/queries/story'
import OrganizationQuery from '../../../apollo/queries/organization'

import mutation from '../../../apollo/mutations/editStory'
import setSaveStatus from '../../../apollo/local/setSaveStatus'

import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(query, mutation)(ExportComponent)

ExportComponent = compose(setSaveStatus)(ExportComponent)
ExportComponent = compose(OrganizationQuery)(ExportComponent)


ExportComponent = withRouter(ExportComponent)



export default ExportComponent
