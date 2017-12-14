import { compose } from 'react-apollo'
import Component from './MovieEditor.component'
import query from './MovieEditor.query'
import mutation, {videoMutation} from './MovieEditor.mutation'



export default compose(query, mutation, videoMutation)(Component)
