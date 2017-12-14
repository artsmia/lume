import CreateStoryButton from './CreateStoryButton.component'
import createStory from './CreateStoryButton.mutation'
import {compose } from 'react-apollo'

export default compose(createStory)(CreateStoryButton)
