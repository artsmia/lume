import { compose, withApollo } from 'react-apollo'
import Component from './EditStoryThumb.component'
import StoryQuery from '../../../apollo/queries/story'
import OrganizationQuery from '../../../apollo/queries/organization'
import { withRouter } from 'next/router'

let ExportComponent = Component

ExportComponent = compose(StoryQuery)(ExportComponent)

ExportComponent = withRouter(ExportComponent)

export default ExportComponent
