import Component from './StoryAssociator.component.js'
import storiesQuery from '../../../apollo/queries/stories'
import storyQuery from '../../../apollo/queries/story'
import editStory from '../../../apollo/mutations/editStory'
import {compose} from 'react-apollo'
import {withRouter} from 'next/router'

let ExportComponent = Component
ExportComponent = compose(storiesQuery)(ExportComponent)
ExportComponent = compose(storyQuery, editStory)(ExportComponent)

ExportComponent = withRouter(ExportComponent)

export default ExportComponent
