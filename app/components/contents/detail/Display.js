import React, { Component } from 'react'
import styled from 'styled-components'
import { ContentZoomer } from '../../shared/Zoomer'

export default class PictureDisplay extends Component {
  render() {
    if (!this.props.content) return null

    const { image0, geometry } = this.props.content

    return (
      <Container>
        <ContentZoomer contentId={this.props.content.id} />
      </Container>
    )
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
`
