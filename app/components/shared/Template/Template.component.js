import React, {Component} from 'react'
import styled from 'styled-components'
import ThemeProvider from '../../mia-ui'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
//import Snack from '../../ui/Snackbar'

export default class Template extends Component {


  state = {
    message: ""
  }

  render() {

    const {
      props,
      props: {
        children,
        snack: {
          message,
          snackId
        }
      },
    } = this

    return (
      <ThemeProvider>
        <DragDropContextProvider
          backend={HTML5Backend}
        >

            {children}

        </DragDropContextProvider>
      </ThemeProvider>
    )
  }


}
