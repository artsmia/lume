import {compose, graphql} from 'react-apollo'
import Component from './OrganizationHome.component'
import {StoriesQuery} from '../../../apollo/queries/stories'
import {withRouter} from 'next/router'

const query = graphql(StoriesQuery, {
  options: ({router}) => {



    return {
      variables: {
        filter: {
          organization: {
            subdomain: router.query.subdomain
          },
          limit: 20,
          offset: 0,
          order: {
            column: "updatedAt",
            direction: "DESC"
          },
          template: (router.query.template) ? router.query.template.split(',') : ["original", "slider"],
          visibility: [
            "published",
          ],
          search: router.query.search || ""
        }
      },
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
})


let ExportComponent = Component
ExportComponent = compose(query)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
