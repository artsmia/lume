import React, {Component} from 'react'
import BrowseItems from '../../../components/BrowseItems'
import withData from '../../../apollo/withData'
import Cookie from 'js-cookie'
import Template from '../../../components/Template'

class Items extends Component {

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
        <BrowseItems
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(Items)
