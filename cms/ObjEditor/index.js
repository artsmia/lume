import { compose } from 'react-apollo'
import Component from './ObjEditor.component'
import query from './ObjEditor.query'
import mutation from './ObjEditor.mutation'



export default compose(query, mutation)(Component)
