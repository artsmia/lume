import { compose } from 'react-apollo'
import Component from './EditContentThumb.component'
import query from './EditContentThumb.query'
import OrganizationQuery from '../../../apollo/queries/organization'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(query)(ExportComponent)
ExportComponent = compose(OrganizationQuery)(ExportComponent)
ExportComponent = withRouter(ExportComponent)


export default ExportComponent
