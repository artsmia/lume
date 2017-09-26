import { graphql, compose } from 'react-apollo'
import Component from './ItemBasicEditor'
import Query from './query.graphql'
import editOrCreateItem from '../../apollo/mutations/editOrCreateItem.graphql'


const queryConfig = {
  options: ({itemId}) => ({
    variables: {
      itemId,
    },
  })
}



const editOrCreateItemConfig = {
  name: "editOrCreateItem",
}




const query = graphql(Query, queryConfig)



export default compose(
  query,
  graphql(editOrCreateItem, editOrCreateItemConfig),
)(
  Component
)
