import { compose } from 'react-apollo'
import Component from './StoryEditor.component'
import query from './StoryEditor.query'
import mutation from './StoryEditor.mutation'



export default compose(query, mutation)(Component)
