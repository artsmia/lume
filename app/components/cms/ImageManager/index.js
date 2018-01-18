import { compose } from 'react-apollo'
import Component from './ImageManager.component'
import query from '../../../apollo/queries/images'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(query)(ExportComponent)

ExportComponent = withRouter(ExportComponent)


export default ExportComponent
