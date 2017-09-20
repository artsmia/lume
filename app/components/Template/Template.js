import React, {Component} from 'react'
import styled from 'styled-components'
import MiaUI from '../../ui'
import Drawer from '../Drawer'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default class Template extends Component {


  render() {

    const {
      props,
      props: {
        children,
        drawer,
      }
    } = this

    return (
      <MiaUI>
        <DragDropContextProvider
          backend={HTML5Backend}
        >
          <Container>
            {(drawer) ? (
              <Drawer
                {...props}

              />
            ): null}

            {children}


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
