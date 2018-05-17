import Component from './CmsHome.component'
import query from '../../../apollo/queries/organization'
import { compose, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'
import addTips from '../../../apollo/local/addTips'
import removeTips from '../../../apollo/local/removeTips'

let ExportComponent = Component

ExportComponent = compose(query, addTips, removeTips)(ExportComponent)

ExportComponent = withRouter(ExportComponent)

export default ExportComponent
