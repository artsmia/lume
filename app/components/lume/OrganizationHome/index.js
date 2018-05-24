import { compose, graphql, withApollo } from 'react-apollo'
import Component from './OrganizationHome.component'
import { StoriesQuery } from '../../../apollo/queries/stories'
import OrganizationQuery from '../../../apollo/queries/organization'
import { withRouter } from 'next/router'

const query = graphql(StoriesQuery, {
  options: ({ router }) => {
    let groups = []

    if (router.query.groups) {
      groups = router.query.groups.split(',')
    }

    let groupSlug

    if (router.query.groupSlug) {
      groupSlug = router.query.groupSlug
    }

    return {
      variables: {
        filter: {
          organization: {
            subdomain: router.query.subdomain
          },
          limit: 30,
          offset: 0,
          order: {
            column: 'updatedAt',
            direction: 'DESC'
          },
          template: router.query.template
            ? router.query.template.split(',')
            : ['original', 'slider'],
          visibility: ['published'],
          search: router.query.search || '',
          groups,
          groupSlug
        }
      }
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  })
})

let ExportComponent = Component
ExportComponent = compose(OrganizationQuery, query)(ExportComponent)

ExportComponent = withRouter(ExportComponent)

// ExportComponent = process.env.EXPORT_MODE === 'export' ? ExportComponent : Component

export default ExportComponent
