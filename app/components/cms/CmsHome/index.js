import Component from './CmsHome.component'
import query from '../../../apollo/queries/organization'
import {compose, withApollo } from 'react-apollo'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(
  withApollo,
  query
)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
