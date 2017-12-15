import { compose } from 'react-apollo'
import Component from './EditStoryThumb.component'
import query from '../../apollo/queries/story'


export default compose(query)(Component)
