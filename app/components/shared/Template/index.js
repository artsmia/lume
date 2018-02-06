import Component from './Template.component'
import {compose, graphql} from 'react-apollo'
import gql from 'graphql-tag'


let ExportComponent = Component

const snackQuery = gql`
  query {
    snack @client {
      message
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

//
// const editSnack = gql`
//   mutation EditSnack (
//     $show: Boolean
//     $message: String
//   ) {
//     editSnack(
//       show: $show
//       message: $message
//     ) @client
//   }
// `
//
// const editSnackConfig = {
//   props({mutate}){
//     return {
//       editSnack(variables){
//         mutate({
//           variables
//         })
//       }
//     }
//   }
// }
//
// const localMutation = graphql(editSnack, editSnackConfig)
//

export default ExportComponent
