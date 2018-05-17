import React, { Component } from 'react'
import Story from '../../components/lume/Story'
import Template from '../../components/shared/Template'

export default class StoryPage extends Component {
  static getInitialProps = async ctx => {
    try {
      return {
        ...ctx.query
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <Template {...this.props}>
        <Story {...this.props} />
      </Template>
    )
  }
}
