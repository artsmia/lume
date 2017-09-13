import { graphql, compose } from 'react-apollo'
import PageEditor from './PageEditor'
import PageQuery from './query.graphql'
import editOrCreatePage from '../../apollo/mutations/editOrCreatePage.graphql'
import deletePage from '../../apollo/mutations/deletePage.graphql'


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


const deletePageConfig = {
  name: "deletePage",
}


const query = graphql(PageQuery, queryConfig)




export default compose(
  query,
  graphql(editOrCreatePage, editOrCreatePageConfig),
  graphql(deletePage, deletePageConfig),
)(
  PageEditor
)
