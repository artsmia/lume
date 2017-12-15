import {compose} from 'react-apollo'
import Component from './ContentEditor.component.js'
import query from '../../apollo/queries/content'
import mutation from '../../apollo/mutations/editContent'

export default compose(query, mutation)(Component)
