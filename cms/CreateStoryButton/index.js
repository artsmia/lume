import CreateStoryButton from './CreateStoryButton.component'
import createStory from '../../apollo/mutations/createStory'
import {compose } from 'react-apollo'

export default compose(createStory)(CreateStoryButton)
