import CreateContentButton from './CreateContentButton.component'
import mutation from '../../../apollo/mutations/createContent'
import { compose } from 'react-apollo'


export default compose(mutation)(CreateContentButton)
