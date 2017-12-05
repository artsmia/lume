import { graphql, compose } from 'react-apollo'
import Component from './DetailEditor'
import editOrCreateDetail from '../../apollo/mutations/editOrCreateDetail'
import deleteDetail from '../../apollo/mutations/deleteDetail'

import gql from 'graphql-tag'

const DetailQuery = gql`
  query DetailQuery (
    $detailId: ID!
  ) {
    detail (
      id: $detailId
    ) {
      id
      title
      description
      geometry {
        type
        coordinates
      }
      index
      image {
        id
      }
      additionalImages {
        id
      }
    }
  }


`

const queryConfig = {
  options: ({detailId}) => ({
    variables: {
      detailId,
    },
  })
}



const editOrCreateDetailConfig = {
  name: "editOrCreateDetail",
}


const deleteDetailConfig = {
  name: "deleteDetail",
}


const query = graphql(DetailQuery, queryConfig)



export default compose(
  query,
  graphql(editOrCreateDetail, editOrCreateDetailConfig),
  graphql(deleteDetail, deleteDetailConfig),
)(
  Component
)
