import { compose } from 'react-apollo'
import Component from './OrgSettings.component'
import query from '../../../apollo/queries/organization'
//import editOrganization from '../../../apollo/mutations/editOrganization'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(
  query
)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
