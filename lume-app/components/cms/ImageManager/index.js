import { compose } from 'react-apollo'
import Component from './ImageManager.component'
import query from '../../../apollo/queries/images'


export default compose(query)(Component)
