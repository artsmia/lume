import React, {Component} from 'react'
import styled from 'styled-components'
import MiaUI from '../../ui'
import Drawer from '../Drawer'

export default class Template extends Component {


  render() {

    const {
      props,
      props: {
        children,
        drawer
      }
    } = this

    return (
      <MiaUI>
        <Container>
          {(drawer) ? (
            <Drawer
              {...props}
            />
          ): null}

          {children}


        </Container>
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
