import React, {Component} from 'react'
import ItemDrawer from './ItemDrawer'
import LeafletViewer from './LeafletViewer'
import styled from 'styled-components'

export default class Item extends Component {
  render() {
    const {
      props,
    } = this
    return (
      <Container>
        <ItemDrawer
          {...props}
        />
        <ImgContainer>
          {/* <LeafletViewer
            {...props}

          /> */}
        </ImgContainer>
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

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
`
