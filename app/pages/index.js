import React, {Component} from 'react'
import LumeHome from '../lume/LumeHome'
import withData from '../apollo'
import Template from '../shared/Template'

class Index extends Component {

  static getInitialProps = async (context) => {
    try {

      return {
      }
    } catch (ex) {

    }
  }

  render() {
    return (
      <Template>
        <LumeHome
          {...this.props}
        />
      </Template>

    )
  }

}

export default withData(props => <Index {...props} />)
