import {compose} from 'react-apollo'
import Component from './Story.component'
import query from '../../../apollo/queries/story'
import organizationQuery from '../../../apollo/queries/organization'

import {withRouter} from 'next/router'

let ExportComponent = Component
ExportComponent = compose(query)(ExportComponent)
ExportComponent = compose(organizationQuery)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
