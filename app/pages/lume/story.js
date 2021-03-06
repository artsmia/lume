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
//
// const StaticStoryWithRouter = withRouter(StaticStory)
//
// class ExportStory extends Component {
//   static getInitialProps = async ctx => {
//     try {
//       return {
//         ...ctx.query
//       }
//     } catch (ex) {
//       console.error(ex)
//     }
//   }
//
//   render() {
//     console.log(process.env)
//     return (
//       <Template>
//         <StaticStoryWithRouter {...this.props.data} />
//       </Template>
//     )
//   }
// }
//
// let ExportComponent =
//   process.env.EXPORT_MODE === 'export' ? ExportStory : StoryPage

// export default StoryPage
