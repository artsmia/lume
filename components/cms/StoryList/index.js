import { compose } from 'react-apollo'
import StoryList from './StoryList.component'
import query from '../../../apollo/queries/stories'

export default compose(query)(StoryList)
