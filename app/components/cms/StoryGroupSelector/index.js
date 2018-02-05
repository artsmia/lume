import {compose} from 'react-apollo'
import Component from './StoryGroupSelector.component.js'
import query from '../../../apollo/queries/organization'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(query)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
