import { compose } from 'react-apollo'
import Component from './Zoomer.component'
import query from './Zoomer.query'

import gql from 'graphql-tag'




export default compose(query)(Component)
