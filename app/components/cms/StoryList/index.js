import { compose } from 'react-apollo'
import Component from './StoryList.component'
import query from '../../../apollo/queries/stories'
import {withRouter} from 'next/router'

let ExportComponent = Component
ExportComponent = compose(query)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
