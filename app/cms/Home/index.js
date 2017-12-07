import Home from './Home'
import {graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query OrgHomeQuery ($orgSub: String) {
    organization  (
      orgSub: $orgSub
    ) {
      id
      name
    }
  }
`

const options = {
  options: (props) => {
    const {url: {query: {orgSub}}} = props
    return {
      variables: {
        orgSub
      }
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default compose(
  graphql(query, options)
)(
  Home
)
