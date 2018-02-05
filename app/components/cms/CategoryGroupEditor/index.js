import {compose} from 'react-apollo'
import Component from './CategoryGroupEditor.component.js'
import query from '../../../apollo/queries/organization'
import mutation from '../../../apollo/mutations/createCategory'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(query)(ExportComponent)
ExportComponent = compose(mutation)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
