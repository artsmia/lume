import Component from './CmsHome.component'
import query from '../../../apollo/queries/organization'
import { compose, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'
import createStory from '../../../apollo/mutations/createStory'

let ExportComponent = Component

ExportComponent = compose(query, createStory, withApollo)(ExportComponent)

ExportComponent = withRouter(ExportComponent)

export default ExportComponent
