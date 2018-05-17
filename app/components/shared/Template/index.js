import Component from './Template.component'
import { compose, graphql } from 'react-apollo'
// import showTips from "../../../apollo/local/showTips"
import { withRouter } from 'next/router'

let ExportComponent = Component
//
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
