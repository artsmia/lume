import {compose} from 'react-apollo'
import Component from './ObjEditor.component.js'
import query from '../../../apollo/queries/obj'
import mutation from '../../../apollo/mutations/editObj'

export default compose(query, mutation)(Component)
