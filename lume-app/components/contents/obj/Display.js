import React, {Component} from 'react'
import styled from 'styled-components'
import Zoomer from '../../shared/Zoomer'
import Video from '../../ui/video'

export default class ObjDisplay extends Component {

  render() {

    if (!this.props.content) return null

    const {
      primaryMediaType,
      primaryImage,
      videoUrl
    } = this.props.content.obj

    return (
      <Container>
        {(
          primaryMediaType === "image" &&
          primaryImage
        ) ? (
          <Zoomer
            imageId={primaryImage.id}
          />
        ):null}
        {(
          primaryMediaType === "video" &&
          videoUrl
        ) ? (
          <Video
            url={videoUrl}
          />
        ):null}

      </Container>
    )
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
`
