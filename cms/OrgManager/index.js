import { compose } from 'react-apollo'
import OrgManager from './OrgManager.component'
import query from './OrgManager.query'
import {joinOrganization, createOrganization} from './OrgManager.mutation'


export default compose(
  query,
  joinOrganization,
  createOrganization
)(OrgManager)
