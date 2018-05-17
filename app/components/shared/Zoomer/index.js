import { compose, withApollo } from 'react-apollo'
import Component from './Zoomer.component'
import query from './Zoomer.query'
import editContent from '../../../apollo/mutations/editContent'
import contentQuery from '../../../apollo/queries/content'
import storyQuery from '../../../apollo/queries/story'

import gql from 'graphql-tag'

export default compose(query)(Component)

export const ContentZoomer = compose(editContent, contentQuery)(Component)

export const StoryZoomer = compose(storyQuery)(Component)
