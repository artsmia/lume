import { compose } from 'react-apollo'
import Component from './StoryGroupSelector.component.js'
import query from '../../../apollo/queries/organization'
import { withRouter } from 'next/router'
import storyQuery from '../../../apollo/queries/story'
import editStory from '../../../apollo/mutations/editStory'

let ExportComponent = Component
ExportComponent = compose(storyQuery, editStory, query)(ExportComponent)

ExportComponent = withRouter(ExportComponent)

export default ExportComponent
