import { compose } from 'react-apollo'
import Component from './ObjSelector.component.js'
import query from '../../../apollo/queries/objs'
import organizationQuery from '../../../apollo/queries/organization'

import mutation from '../../../apollo/mutations/createObj'
import { withRouter } from 'next/router'

let ExportComponent = Component

ExportComponent = compose(organizationQuery, query, mutation)(ExportComponent)

export default withRouter(ExportComponent)
