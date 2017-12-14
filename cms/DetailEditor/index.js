import { compose } from 'react-apollo'
import Component from './DetailEditor.component'
import query from './DetailEditor.query'
import mutation from './DetailEditor.mutation'



export default compose(query, mutation)(Component)
