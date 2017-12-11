import { compose } from 'react-apollo'
import Component from './ComparisonEditor.component'
import query from './ComparisonEditor.query'
import mutation from './ComparisonEditor.mutation'



export default compose(query, mutation)(Component)
