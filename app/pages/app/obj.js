import React, {Component} from 'react'
import AppObj from '../../components/AppObj'
import withData from '../../apollo'
import Template from '../../components/Template'


class AppIndex extends Component {

  static getInitialProps = async (ctx) => {
    try {
      console.log(ctx)
      const {orgSub, objId} = ctx.query
      return {
        orgSub,
        objId
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <Template
        drawer={false}
      >
        <AppObj
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(AppIndex)
