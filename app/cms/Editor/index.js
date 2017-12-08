import { compose } from 'react-apollo'
import Component from './Editor.component'
import query from './Editor.query'





export default compose(query)(Component)
