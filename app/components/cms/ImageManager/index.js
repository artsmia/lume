import { compose, withApollo } from 'react-apollo'
import Component from './ImageManager.component'
import query from '../../../apollo/queries/images'
import OrgQuery from '../../../apollo/queries/organization'

import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(query)(ExportComponent)
ExportComponent = compose(OrgQuery)(ExportComponent)

ExportComponent = withRouter(ExportComponent)
ExportComponent = withApollo(ExportComponent)

export default ExportComponent
