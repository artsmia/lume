import CreateContentButton from './CreateContentButton.component'
import mutation from './CreateContentButton.mutation'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import {StoryQuery} from '../Editor/Editor.query'


export default compose(mutation)(CreateContentButton)
