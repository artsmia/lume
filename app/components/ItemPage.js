import React, {Component} from 'react'
import styled from 'styled-components'
import Link from './Link'
import ItemDrawer from './ItemDrawer'
import Leaflet from './Leaflet'

export default class ItemPage extends Component {
  render() {
    const {
      props,
    } = this
    return (
      <Container>
        <ItemDrawer
          {...props}
        />
        <Leaflet
          {...props}
        />

      </Container>
    )
  }
}


export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`
