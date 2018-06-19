import React, { Component } from 'react'
import styled from 'styled-components'
import { MapZoomer } from '../../shared/Zoomer'

export default class MapDisplay extends Component {
  render() {
    if (!this.props.content) return null

    const { image0 } = this.props.content

    return (
      <Container>
        {image0 ? <MapZoomer contentId={this.props.content.id} /> : null}
      </Container>
    )
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
`
