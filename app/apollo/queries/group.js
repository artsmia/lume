import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import groupFragment from '../fragments/group'

export const GroupQuery = gql`
  query GroupQuery($groupId: ID!) {
    group(id: $groupId) {
      ...GroupFragment
    }
  }
  ${groupFragment}
`

const queryConfig = {
  options: ({ groupId }) => ({
    variables: {
      groupId
    }
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  })
}

export default graphql(GroupQuery, queryConfig)
