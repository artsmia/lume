import { compose } from 'react-apollo'
import OrgManager from './OrgManager.component'
import query from '../../../apollo/queries/organizations'
import joinOrganization from '../../../apollo/mutations/joinOrganization'
import createOrganization from '../../../apollo/mutations/createOrganization'
import addTips from '../../../apollo/local/addTips'
import removeTips from '../../../apollo/local/removeTips'

export default compose(
  query,
  joinOrganization,
  createOrganization,
  addTips,
  removeTips
)(OrgManager)
