import { compose } from 'react-apollo'
import Component from './ManageUsers.component'
import query from '../../../apollo/queries/users'
import editUserOrganizationRole from '../../../apollo/mutations/editUserOrganizationRole'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(query)(ExportComponent)
ExportComponent = compose(editUserOrganizationRole)(ExportComponent)
//
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
