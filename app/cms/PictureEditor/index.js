import { compose } from 'react-apollo'
import Component from './PictureEditor.component'
import query from './PictureEditor.query'
import mutation from './PictureEditor.mutation'



export default compose(query, mutation)(Component)
