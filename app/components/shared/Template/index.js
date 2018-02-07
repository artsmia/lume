import Component from './Template.component'
import {compose, graphql} from 'react-apollo'
import gql from 'graphql-tag'


let ExportComponent = Component

const snackQuery = gql`
  query {
    snack @client {
      message
      snackId
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

const localQuery = graphql(snackQuery, localConfig)

ExportComponent = compose(localQuery)(ExportComponent)


export default ExportComponent
