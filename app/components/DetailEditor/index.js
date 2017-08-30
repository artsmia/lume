import { graphql, compose } from 'react-apollo'
import DetailEditor from './DetailEditor'
import DetailQuery from './query.graphql'
import editOrCreateClip from '../../apollo/mutations/editOrCreateClip.graphql'


const queryConfig = {
  options: ({detailId}) => ({
    variables: {
      detailId,
    },
  })
}



const mutationConfig = {
  name: "editOrCreateClip",
  // options: (props) => ({
  //   optimisticResponse: {
  //     editOrCreateItem: {
  //       id: -1,
  //       __typename: "Item"
  //     }
  //   },
  //   update: (store, {data: {editOrCreateItem}}) => {
  //     let data = store.readQuery({
  //       query: ItemsQuery,
  //       variables: {
  //         orgSub,
  //         search
  //       }
  //     })
  //     data.items.push(editOrCreateItem)
  //     store.writeQuery({
  //       query: ItemsQuery,
  //       variables: {
  //         orgSub,
  //         search
  //       },
  //       data
  //     })
  //   }
  // })
}


const query = graphql(DetailQuery, queryConfig)




export default compose(
  query,
  graphql(editOrCreateClip, mutationConfig)
)(
  DetailEditor
)
