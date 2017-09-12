import React, {Component} from 'react'
import EditBook from '../../../components/EditBook'
import withData from '../../../apollo/withData'
import Cookie from 'js-cookie'

class EditBookPage extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {orgSub, bookId} = ctx.query
      return {
        userId,
        orgSub,
        bookId
      }
    } catch (ex) {
      console.error(ex)
    }
  }


  render() {
    return (
      <EditBook
        {...this.props}
      />
    )
  }
}

export default withData(EditBookPage)
