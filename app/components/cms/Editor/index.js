import { compose, graphql } from 'react-apollo'
import Component from './Editor.component'
import query from '../../../apollo/queries/story'
import OrgQuery from '../../../apollo/queries/organization'

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

ExportComponent = compose(saveStatus)(ExportComponent)
ExportComponent = compose(OrgQuery)(ExportComponent)



ExportComponent = withRouter(ExportComponent)

ExportComponent = compose(query, mutation)(ExportComponent)


export default ExportComponent
