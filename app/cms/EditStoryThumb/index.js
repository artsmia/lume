import { compose } from 'react-apollo'
import Component from './EditStoryThumb.component'
import query from './EditStoryThumb.query'




export default compose(query)(Component)
