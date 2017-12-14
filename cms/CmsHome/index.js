import CmsHome from './CmsHome.component'
import query from './CmsHome.query'
import {compose } from 'react-apollo'


export default compose(query)(CmsHome)
