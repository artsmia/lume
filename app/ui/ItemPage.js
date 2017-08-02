import React, {Component} from 'react'
import ItemDrawer from './ItemDrawer'
// import LeafletViewer from './LeafletViewer'
import styled from 'styled-components'
import Link from './Link'
import Leaflet from './Leaflet'

export default class Item extends Component {
  render() {
    const {
      props,
    } = this
    return (
      <Container>
        <Link
          href={{
            pathname: "/",
          }}
          as={"/"}
        >
          Home
        </Link>
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
  position: absolute;
  height: 100%;
  width: 100%;
`
