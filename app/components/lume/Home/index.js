import {compose } from 'react-apollo'
import Home from './Home.component'
import query from '../../../apollo/queries/organizations'



export default compose(query)(Home)
