import React, {Component} from 'react'
import EditThematic from '../../../components/EditThematic'
import withData from '../../../apollo'
import Cookie from 'js-cookie'

class EditThematicPage extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const userId = (ctx.req) ? ctx.req.userId : Cookie.get("userId")
      const {orgSub, thematicId} = ctx.query
      return {
        userId,
        orgSub,
        thematicId
      }
    } catch (ex) {
      console.error(ex)
    }
  }


  render() {
    return (
      <EditThematic
        drawer
        {...this.props}
      />
    )
  }
}

export default withData(EditThematicPage)
