import {graphql, compose } from 'react-apollo'
import BrowseThematics from './BrowseThematics'
import newThematic from '../../apollo/mutations/editOrCreateThematic'
import gql from 'graphql-tag'

const query = gql`
  query thematicsQuery (
    $search: String
    $filter: Filter
    $subdomain: String
  ) {
    thematics (
      search: $search
      filter: $filter
      subdomain: $subdomain
    ) {
      id
      title
      previewImage {
        id
      }
      updatedAt
    }
    organization (
      subdomain: $subdomain
    ) {
      id
    }
  }


`


const queryConfig = {
  options: ({subdomain}) => {

    const filter = {
      limit: 20,
      order: {
        column: "updatedAt",
        direction: "DESC"
      }
    }
    return {
      variables: {
        subdomain,
        filter: {
          ...filter,
        }
      },
    }

  }
}



const mutationConfig = {
  name: "newThematic",
  options: ({subdomain, search}) => ({
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
          subdomain,
          search
        }
      })
      data.thematics.push(editOrCreateThematic)
      store.writeQuery({
        query,
        variables: {
          subdomain,
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
