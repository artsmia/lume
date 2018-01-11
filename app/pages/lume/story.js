import React, {Component} from 'react'
import Story from '../../components/lume/Story'
import withData from '../../apollo'
import Template from '../../components/shared/Template'

class StoryPage extends Component {

  static getInitialProps = async (ctx) => {
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
      <Template
        drawer
        {...this.props}
      >
        <Story
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(StoryPage)
