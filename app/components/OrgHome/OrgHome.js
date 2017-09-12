import React, {Component} from 'react'
import Template from '../Template'

export default class Home extends Component {

  render() {

    if (this.props.data.loading) {
      return null
    }
    const {
      props,
      props: {
        data: {
          organization: {
            name
          }
        }
      }
    } = this
    return (
      <Template
        drawer
        {...props}
      >
      </Template>
    )
  }

}
