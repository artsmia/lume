import Component from './CreateStoryButton.component'
import mutation from '../../../apollo/mutations/createStory'
import {compose } from 'react-apollo'
import {withRouter} from 'next/router'

let ExportComponent = Component
ExportComponent = compose(mutation)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
