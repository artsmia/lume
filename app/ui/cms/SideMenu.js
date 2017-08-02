import React, {Component} from 'react'
import styled from 'styled-components'

export default class SideMenu extends Component {
  render() {
    const {
      children
    } = this.props
    return (
      <Container>
        {children}
      </Container>
    )
  }


}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: lightgrey;
`
