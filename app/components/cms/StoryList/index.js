import { compose } from 'react-apollo'
import Component from './StoryList.component'
import query from '../../../apollo/queries/stories'
import organizationQuery from '../../../apollo/queries/organization'

import { withRouter } from 'next/router'

let ExportComponent = Component

ExportComponent = compose(organizationQuery, query)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
