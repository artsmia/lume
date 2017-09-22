import { gql, graphql, compose } from 'react-apollo'
import BrowseItems from './BrowseItems'
import ItemsQuery from './query.graphql'
import newItem from '../../apollo/mutations/editOrCreateItem.graphql'


const queryConfig = {
  options: ({orgSub}) => ({
    variables: {
      orgSub,
    },
  })
}



const mutationConfig = {
  name: "newItem",
  options: ({orgSub, search}) => ({
    optimisticResponse: {
      editOrCreateItem: {
        id: -1,
        title: "New Item",
        attribution: "",
        medium: "",
        culture: "",
        dimensions: "",
        date: "",
        __typename: "Item"
      }
    },
    update: (store, {data: {editOrCreateItem}}) => {
      let data = store.readQuery({
        query: ItemsQuery,
        variables: {
          orgSub,
          search
        }
      })
      data.items.push(editOrCreateItem)
      store.writeQuery({
        query: ItemsQuery,
        variables: {
          orgSub,
          search
        },
        data
      })
    }
  })
}


const query = graphql(ItemsQuery, queryConfig)




export default compose(
  query,
  graphql(newItem, mutationConfig)
)(
  BrowseItems
)
