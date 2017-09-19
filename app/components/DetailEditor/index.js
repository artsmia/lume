import { graphql, compose } from 'react-apollo'
import Component from './DetailEditor'
import DetailQuery from './query.graphql'
import editOrCreateDetail from '../../apollo/mutations/editOrCreateDetail.graphql'
import editOrCreateClip from '../../apollo/mutations/editOrCreateClip.graphql'
import deleteDetail from '../../apollo/mutations/deleteDetail.graphql'


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


let DetailEditor = graphql(editOrCreateClip, {
  name: "editClip",
})(Component)


export default compose(
  query,
  graphql(editOrCreateDetail, editOrCreateDetailConfig),
  graphql(deleteDetail, deleteDetailConfig),
)(
  DetailEditor
)
