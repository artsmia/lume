import React, {Component} from 'react'
import EditItem from '../../../components/EditItem'
import withData from '../../../apollo/withData'
import Cookie from 'js-cookie'
import Template from '../../../components/Template'

class Item extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {orgSub, itemId} = ctx.query
      return {
        userId,
        orgSub,
        itemId
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
        <EditItem
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(Item)
