import { compose } from 'react-apollo'
import OrgManager from './OrgManager.component'
import query from '../../../apollo/queries/organizations'
import joinOrganization from '../../../apollo/mutations/joinOrganization'
import createOrganization from '../../../apollo/mutations/createOrganization'


export default compose(
  query,
  joinOrganization,
  createOrganization
)(OrgManager)
