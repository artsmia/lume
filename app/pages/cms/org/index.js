import React, {Component} from 'react'
import OrgHome from '../../../components/OrgHome'
import withData from '../../../apollo/withData'


class OrgIndex extends Component {

  static getInitialProps = async (context) => {
    try {

    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <OrgHome
        {...this.props}
      />
    )
  }
}

export default withData(OrgIndex)
