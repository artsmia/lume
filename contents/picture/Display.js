import React, {Component} from 'react'
import styled from 'styled-components'
import Zoomer from '../../components/shared/Zoomer'

export default class PictureDisplay extends Component {

  render() {

    if (!this.props.content) return null

    const {
      image0
    } = this.props.content

    return (
      <Container>
        {(image0) ? (
          <Zoomer
            imageId={image0.id}
          />
        ): null}

      </Container>
    )
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
`
