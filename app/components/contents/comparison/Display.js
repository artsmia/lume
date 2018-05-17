import React, { Component } from 'react'
import styled from 'styled-components'
import Zoomer from '../../shared/Zoomer'

export default class PictureDisplay extends Component {
  render() {
    if (!this.props.content) return null

    const { image0, image1 } = this.props.content

    return (
      <Container>
        <Side>{image0 ? <Zoomer imageId={image0.id} /> : null}</Side>
        <Side>{image1 ? <Zoomer imageId={image1.id} /> : null}</Side>
      </Container>
    )
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`
const Side = styled.div`
  width: 50%;
  height: 100%;
`
