import { compose } from 'react-apollo'
import Component from './Editor.component'
import query from '../../../apollo/queries/story'
import mutation from '../../../apollo/mutations/reorderContents'





export default compose(query, mutation)(Component)
