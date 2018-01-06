import {compose, graphql} from 'react-apollo'
import component from './OrganizationHome.component'
import {StoriesQuery} from '../../../apollo/queries/stories'

const query = graphql(StoriesQuery, {
  options: ({subdomain}) => ({
    variables: {
      filter: {
        organization: {
          subdomain
        },
        limit: 20,
        offset: 0,
        order: {
          column: "updatedAt",
          direction: "DESC"
        }
      }
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
})

export default compose(query)(component)
