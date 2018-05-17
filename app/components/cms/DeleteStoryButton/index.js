import Component from './DeleteStoryButton.component'
import mutation from '../../../apollo/mutations/deleteStory'
import { compose } from 'react-apollo'

export default compose(mutation)(Component)
