import React, {Component} from 'react'
import Editor from '../../components/cms/Editor'
import withData from '../../apollo'
import Template from '../../components/shared/Template'

class Edit extends Component {

  static getInitialProps = async (ctx) => {
    try {
      return {
        ...ctx.query
      }
    } catch (ex) {
      console.error(ex)
    }
  }


  render() {
    return (
      <Template
        {...this.props}
      >
        <Editor
          {...this.props}
        />
      </Template>
    )
  }
}

export default withData(Edit)
