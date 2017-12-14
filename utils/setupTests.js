import React, {Component} from 'react'
import {ThemeProvider} from 'styled-components'
import theme from '../ui/theme'
import withData from '../apollo/withData'

export default function(ComponentToWrap){
  let ComponentWithData = withData(ComponentToWrap)
  return class WrappedComponent extends Component {
    render(){
      return (
        <ThemeProvider
          theme={theme}
        >
          <ComponentWithData
            serverState={{}}
            {...this.props}
          />
        </ThemeProvider>
      )
    }
  }
}
