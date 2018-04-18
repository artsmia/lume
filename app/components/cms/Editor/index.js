import { compose, graphql } from 'react-apollo'
import Component from './Editor.component'
import query from '../../../apollo/queries/story'
import mutation from '../../../apollo/mutations/reorderContents'
import {withRouter} from 'next/router'
import gql from 'graphql-tag'

let ExportComponent = Component
ExportComponent = compose(query, mutation)(ExportComponent)


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

ExportComponent = withRouter(ExportComponent)

export default ExportComponent
