import Component from './CreateStoryButton.component'
import mutation from '../../../apollo/mutations/createStory'
import showSnack from '../../../apollo/local/showSnack'
import {compose } from 'react-apollo'
import {withRouter} from 'next/router'

let ExportComponent = Component
ExportComponent = compose(mutation)(ExportComponent)
ExportComponent = compose(showSnack)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
