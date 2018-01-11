import { compose } from 'react-apollo'
import Component from './StoryEditor.component'
import query from '../../../apollo/queries/story'
import mutation from '../../../apollo/mutations/editStory'



export default compose(query, mutation)(Component)
