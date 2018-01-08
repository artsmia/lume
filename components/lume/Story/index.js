import {compose} from 'react-apollo'
import component from './Story.component'
import query from '../../../apollo/queries/story'

export default compose(query)(component)
