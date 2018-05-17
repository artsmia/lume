import { compose } from 'react-apollo'
import Component from './Home.component'
import query from '../../../apollo/queries/organizations'

let ExportComponent = Component

ExportComponent = compose(query)(ExportComponent)

export default ExportComponent
