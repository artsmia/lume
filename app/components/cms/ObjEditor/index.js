import {compose} from 'react-apollo'
import Component from './ObjEditor.component.js'
import query from '../../../apollo/queries/obj'
import organization from '../../../apollo/queries/organization'

import mutation from '../../../apollo/mutations/editObj'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(
  query,
  mutation,
  organization
)(ExportComponent)


export default withRouter(ExportComponent)
