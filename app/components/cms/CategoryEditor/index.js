import { compose } from 'react-apollo'
import Component from './CategoryEditor.component.js'
import query from '../../../apollo/queries/category'
import editCategory from '../../../apollo/mutations/editCategory'
import deleteCategory from '../../../apollo/mutations/deleteCategory'
import createGroup from '../../../apollo/mutations/createGroup'

let ExportComponent = Component

ExportComponent = compose(query)(ExportComponent)
ExportComponent = compose(editCategory)(ExportComponent)
ExportComponent = compose(deleteCategory)(ExportComponent)
ExportComponent = compose(createGroup)(ExportComponent)

export default ExportComponent
