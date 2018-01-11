import {compose} from 'react-apollo'
import Component from './ObjSelector.component.js'
import query from '../../../apollo/queries/objs'
import mutation from '../../../apollo/mutations/createObj'


export default compose(query, mutation)(Component)
