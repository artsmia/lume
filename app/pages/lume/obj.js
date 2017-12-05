import React, {Component} from 'react'
import Obj from '../../lume/Obj'
import withData from '../../apollo'
import Template from '../../shared/Template'


class LumeIndex extends Component {

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
        <Obj
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(LumeIndex)
