import React, {Component} from 'react'
import styled from 'styled-components'
import Video from '../../components/ui/video'

export default class MovieDisplay extends Component {

  render() {

    if (!this.props.content) return null

    return (
      <Container>
        <Video
          url={this.props.content.videoUrl}
        />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
