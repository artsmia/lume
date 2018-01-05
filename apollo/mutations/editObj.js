import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import objFragment from '../fragments/obj'


const editObj = gql`
  mutation editObj (
    $obj: ObjInput
  ) {
    editObj(
      obj: $obj
    ) {
      ...ObjFragment
    }
  }
  ${objFragment}

`

const mutationConfig = {
  props: ({mutate, ownProps: {objId} }) => ({
    editObj: (obj) => mutate({
      variables: {
        id: objId,
        ...obj
      },
    }),
  }),

}

export default graphql(editObj, mutationConfig)
