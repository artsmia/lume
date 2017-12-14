import { compose } from 'react-apollo'
import Component from './EditContentThumb.component'
import query from './EditContentThumb.query'




export default compose(query)(Component)
