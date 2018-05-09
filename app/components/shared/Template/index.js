import Component from './Template.component'
import {compose, graphql} from 'react-apollo'
import showTips from '../../../apollo/local/showTips'
import getToolTips from '../../../apollo/local/getToolTips'

let ExportComponent = Component






ExportComponent = compose(
  showTips,
  getToolTips,
)(ExportComponent)


export default ExportComponent
