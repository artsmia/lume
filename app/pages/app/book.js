import React, {Component} from 'react'
import AppBook from '../../components/AppBook'
import withData from '../../apollo/withData'
import Template from '~/components/Template'


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
      <Template
        drawer={false}
      >
        <AppBook
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(AppBookPage)
