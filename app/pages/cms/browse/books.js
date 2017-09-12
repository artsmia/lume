import React, {Component} from 'react'
import BrowseBooks from '../../../components/BrowseBooks'
import withData from '../../../apollo/withData'
import Cookie from 'js-cookie'

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
      <BrowseBooks
        {...this.props}
      />
    )
  }
}

export default withData(Books)
