import React, {Component} from 'react'
import styled from 'styled-components'
import MiaUI from '../../ui'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Snack from '../../ui/Snackbar'

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
      <MiaUI>
        <DragDropContextProvider
          backend={HTML5Backend}
        >
          <Container>

            {children}

            {/* <Snack
              message={message}
              snackId={snackId}
            /> */}
          </Container>
        </DragDropContextProvider>
      </MiaUI>
    )
  }


}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  min-height: 100vh;
`
