import {compose } from 'react-apollo'
import LumeHome from './LumeHome.component'
import query from './LumeHome.query'



export default compose(query)(LumeHome)
