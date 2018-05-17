import { compose, withApollo } from 'react-apollo'
import Component from './EditContentThumb.component'
import ContentQuery from '../../../apollo/queries/content'
// import OrganizationQuery from '../../../apollo/queries/organization'
import { withRouter } from 'next/router'

let ExportComponent = Component

ExportComponent = compose(ContentQuery)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
