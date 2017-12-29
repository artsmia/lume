import CmsHome from './CmsHome.component'
import query from '../../../apollo/queries/organization'
import {compose } from 'react-apollo'


export default compose(query)(CmsHome)
