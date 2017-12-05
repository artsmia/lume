import { graphql, compose } from 'react-apollo'
import PageEditor from './PageEditor'
import editOrCreatePage from '../../apollo/mutations/editOrCreatePage'
import deletePage from '../../apollo/mutations/deletePage'

import gql from 'graphql-tag'

const query = gql`
  query PageQuery (
    $pageId: ID!
  ) {
    page (
      id: $pageId
    ) {
      id
      title
      type
      text
      video
      mainImage {
        id
      }
      comparisonImage0 {
        id
      }
      comparisonImage1 {
        id
      }
    }
  }

`


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




export default compose(
  graphql(query, queryConfig),
  graphql(editOrCreatePage, editOrCreatePageConfig),
  graphql(deletePage, deletePageConfig),
)(
  PageEditor
)
