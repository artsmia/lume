import { compose, withApollo } from 'react-apollo'
import Component from './EditContentThumb.component'
import ContentQuery from '../../../apollo/queries/content'
import OrganizationQuery from '../../../apollo/queries/organization'
import {withRouter} from 'next/router'

let ExportComponent = Component

ExportComponent = compose(
  withApollo,
  ContentQuery,
  OrganizationQuery
)(ExportComponent)
// ExportComponent = compose(OrganizationQuery)(ExportComponent)

ExportComponent = withRouter(ExportComponent)


export default ExportComponent
