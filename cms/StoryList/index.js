import { compose } from 'react-apollo'
import StoryList from './StoryList.component'
import query from './StoryList.query'




export default compose(query)(StoryList)
