import { gql, graphql, compose } from 'react-apollo'
import Data from './Data'
import ItemsQuery from './query.graphql'


const queryConfig = {
  options({orgSub, search, pageSize}) {
    return {
      variables: {
        orgSub,
        search,
        filter: {
          limit: pageSize,
          offset: 0,
          order: {
            column: "title",
            direction: "ASC"
          }
        }
      },
    }
  },
  props({
    data: {
      items,
      loading,
      fetchMore
    },
    ownProps: {
        pageSize
    }
  }) {


    return {
      items,
      loading,
      loadMore(){

        return fetchMore({
          variables: {
            filter: {
              limit: pageSize,
              offset: items.length,
              order: {
                column: "title",
                direction: "ASC"
              }
            }
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return previousResult }

            console.log("previousResult", previousResult)
            console.log("fetchMoreResult", fetchMoreResult)

            return Object.assign({}, previousResult, {
              items: [...previousResult.items, ...fetchMoreResult.items]
            })
          },
        })
      }
    }
  }
}




const query = graphql(ItemsQuery, queryConfig)




export default compose(
  query,
)(
  Data
)
