import React, {Component} from 'react'
import { gql, graphql } from 'react-apollo'
import Template, {Centered} from '../ui/cms/Template'
import {H2} from '../ui/h'

class Home extends Component {



  render() {

    if (this.props.data.loading) {
      return null
    }
    const {
      props: {
        data: {
          organization: {
            name
          }
        }
      }
    } = this
    return (
      <Template>
        <Centered>
          <H2>
            {name}
          </H2>
        </Centered>
      </Template>
    )
  }

}

const org = gql`
  query organization ($subdomain: String) {
    organization  (
      subdomain: $subdomain
    ) {
      id
      name
    }
  }
`

export default graphql(
  org, {
    options: (stuff) => {
      const {url: {query: {orgSub}}} = stuff
      console.log(stuff)
      return {
        variables: {
          subdomain: orgSub
        }
      }
    }
  }
)(
  Home
)
