import React, {Component} from 'react'
import BrowseBooks from '../../../components/BrowseBooks'
import withData from '../../../apollo/withData'
import Cookie from 'js-cookie'
import Template from '../../../components/Template'

class Books extends Component {

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
        <BrowseBooks
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(Books)
