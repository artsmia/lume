import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import fragment from './ObjEditor.fragment'


const editObj = gql`
  mutation editObj (
    $objId: ID!
    $title: String
    $localId: String
    $medium: String
    $dimensions: String
    $attribution: String
    $date: String
    $culture: String
    $accessionNumber: String
    $currentLocation: String
    $creditLine: String
    $description: String
    $type: String
    $primaryMediaType: MediaEnum
    $primaryImageId: ID
    $primaryVideoId: ID
    $pullFromCustomApi: Boolean
  ) {
    editObj(
      id: $objId
      title: $title
      localId: $localId
      medium: $medium
      dimensions: $dimensions
      attribution: $attribution
      date: $date
      culture: $culture
      accessionNumber: $accessionNumber
      currentLocation: $currentLocation
      creditLine: $creditLine
      description: $description
      type: $type
      primaryMediaType: $primaryMediaType
      primaryImageId: $primaryImageId
      primaryVideoId: $primaryVideoId
      pullFromCustomApi: $pullFromCustomApi
    ) {
      ...ObjEditorFragment
    }
  }

  ${fragment}
`

const mutationConfig = {
  props: ({mutate, ownProps: {objId} }) => ({
    editObj: (variables) => mutate({
      variables
    }),
  }),

}

export default graphql(editObj, mutationConfig)
