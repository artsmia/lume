import React, {Component} from 'react'
import EditItem from '../../../components/EditItem'
import withData from '../../../apollo/withData'
import Cookie from 'js-cookie'

class Item extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")

      return {
        userId
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <EditItem
        {...this.props}
      />
    )
  }
}

export default withData(Item)
