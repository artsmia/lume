import React, {Component} from 'react'
import Home from '../../lume/Home'
import withData from '../../apollo'
import Template from '../../shared/Template'

class LumeIndex extends Component {

  static getInitialProps = async (ctx) => {
    try {

      const {orgSub} = ctx.query
      return {
        orgSub
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <Template
        drawer={false}
        {...this.props}
      >
        <Home
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(LumeIndex)
