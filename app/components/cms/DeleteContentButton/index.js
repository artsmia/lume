import Component from './DeleteContentButton.component'
import mutation from '../../../apollo/mutations/deleteContent'
import { compose } from 'react-apollo'

export default compose(mutation)(Component)
