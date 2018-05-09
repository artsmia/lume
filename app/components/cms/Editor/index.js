import { compose, graphql, withApollo } from 'react-apollo'
import Component from './Editor.component'
import query from '../../../apollo/queries/story'
import OrgQuery from '../../../apollo/queries/organization'
import addTips from '../../../apollo/local/addTips'
import removeTips from '../../../apollo/local/removeTips'

import mutation from '../../../apollo/mutations/reorderContents'
import {withRouter} from 'next/router'
import gql from 'graphql-tag'

let ExportComponent = Component


const SaveStatusQuery = gql`
  query SaveStatus {
    saveStatus {
      synced
    }
  }
`

const localConfig = {
  props({ownProps, data}){
    return {
      ...ownProps,
      ...data
    }
  }
}

const saveStatus = graphql(SaveStatusQuery, localConfig)



ExportComponent = compose(
  query,
  mutation,
  saveStatus,
  addTips,
  removeTips
)(ExportComponent)

ExportComponent = withRouter(ExportComponent)


export default ExportComponent
