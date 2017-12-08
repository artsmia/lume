import Home from './Home'
import {graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query OrgHomeQuery ($orgSub: String) {
    organization  (
      subdomain: $orgSub
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


const createStory = gql`
  mutation createStory (
    $organizationId: ID!
  ) {
    createStory(
      organizationId: $organizationId
    ) {
      id
    }
  }
`

const mutationConfig = {
  name: "createStory",
}


export default compose(
  graphql(query, options),
  graphql(createStory, mutationConfig)
)(
  Home
)
