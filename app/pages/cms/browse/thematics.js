import React, {Component} from 'react'
import BrowseThematics from '../../../components/BrowseThematics'
import withData from '../../../apollo'
import Cookie from 'js-cookie'
import Template from '../../../components/Template'

class Thematics extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {orgSub} = ctx.query
      return {
        userId,
        orgSub
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
        <BrowseThematics
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(Thematics)
