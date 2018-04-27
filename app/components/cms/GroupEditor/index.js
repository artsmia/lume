import {compose, withApollo} from 'react-apollo'
import Component from './GroupEditor.component.js'
import query from '../../../apollo/queries/group'
import editGroup from '../../../apollo/mutations/editGroup'
import deleteGroup from '../../../apollo/mutations/deleteGroup'

let ExportComponent = Component

ExportComponent = compose(
  withApollo,
  query,
  editGroup,
  deleteGroup
)(ExportComponent)


export default ExportComponent
