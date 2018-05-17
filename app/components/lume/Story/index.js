import { compose } from 'react-apollo'
import Component from './Story.component'
import query from '../../../apollo/queries/story'

let ExportComponent = Component
ExportComponent = compose(query)(ExportComponent)

export default ExportComponent
