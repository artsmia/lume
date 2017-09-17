import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../Template'

export default class Home extends Component {


  render() {

    if (this.props.data.loading) {
      return null
    }
    const {
      props
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
