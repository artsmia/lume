import {graphql, compose } from 'react-apollo'
import BrowseThematics from './BrowseThematics'
import newThematic from '../../apollo/mutations/editOrCreateThematic'
import gql from 'graphql-tag'

const query = gql`
  query thematicsQuery (
    $search: String
    $filter: Filter
    $orgSub: String
  ) {
    thematics (
      search: $search
      filter: $filter
      orgSub: $orgSub
    ) {
      id
      title
      previewImage {
        id
      }
      updatedAt
    }
    organization (
      orgSub: $orgSub
    ) {
      id
    }
  }


`


const queryConfig = {
  options: ({orgSub}) => {

    const filter = {
      limit: 20,
      order: {
        column: "updatedAt",
        direction: "DESC"
      }
    }
    return {
      variables: {
        orgSub,
        filter: {
          ...filter,
        }
      },
    }

  }
}



const mutationConfig = {
  name: "newThematic",
  options: ({orgSub, search}) => ({
    optimisticResponse: {
      editOrCreateThematic: {
        id: -1,
        __typename: "Thematic"
      }
    },
    update: (store, {data: {editOrCreateThematic}}) => {
      let data = store.readQuery({
        query,
        variables: {
          orgSub,
          search
        }
      })
      data.thematics.push(editOrCreateThematic)
      store.writeQuery({
        query,
        variables: {
          orgSub,
          search
        },
        data
      })
    }
  })
}




export default compose(
  graphql(query, queryConfig),
  graphql(newThematic, mutationConfig)
)(
  BrowseThematics
)
