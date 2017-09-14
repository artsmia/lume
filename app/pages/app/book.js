import React, {Component} from 'react'
import AppBook from '../../components/AppBook'
import withData from '../../apollo/withData'


class AppBookPage extends Component {

  static getInitialProps = async (ctx) => {
    try {
      const {orgSub, bookId} = ctx.query
      return {
        orgSub,
        bookId
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return (
      <AppBook
        {...this.props}
      />
    )
  }
}

export default withData(AppBookPage)
