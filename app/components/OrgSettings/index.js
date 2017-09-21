import OrgHome from './OrgSettings'
import {graphql, compose } from 'react-apollo'
import query from './query.graphql'
import editOrCreateOrganization from '../../apollo/mutations/editOrCreateOrganization.graphql'

const options = {
  options: (props) => {
    const {url: {query: {orgSub}}} = props
    return {
      variables: {
        subdomain: orgSub
      }
    }
  }
}


export default compose(
  graphql(query, options),
  graphql(editOrCreateOrganization, {
    name: "editOrganization"
  })
)(
  OrgHome
)
