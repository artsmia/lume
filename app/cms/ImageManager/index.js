import { compose } from 'react-apollo'
import Component from './ImageManager.component'
import query from './ImageManager.query'


export default compose(query)(Component)
