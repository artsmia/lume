import { graphql, compose } from 'react-apollo'
import PageEditor from './PageEditor'
import PageQuery from './query.graphql'
import editOrCreatePage from '../../apollo/mutations/editOrCreatePage.graphql'
// import deleteDetail from '../../apollo/mutations/deleteDetail.graphql'


const queryConfig = {
  options: ({pageId}) => ({
    variables: {
      pageId,
    },
  })
}



const editOrCreatePageConfig = {
  name: "editOrCreatePage",
}

//
// const deleteDetailConfig = {
//   name: "deleteDetail",
// }


const query = graphql(PageQuery, queryConfig)




export default compose(
  query,
  graphql(editOrCreatePage, editOrCreatePageConfig),
  //graphql(deleteDetail, deleteDetailConfig),
)(
  PageEditor
)
