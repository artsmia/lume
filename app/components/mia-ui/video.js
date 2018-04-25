import React, {Component} from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import {Flex, Box} from 'grid-styled'

export default class Video extends Component {
  render(){

    if (!this.props.url) return null

    const {
      url
    } = this.props



    return (
      <ReactPlayer
        url={url}
        controls={true}
      />
    )
  }
}

const Container = styled(Flex)`
  height: 300px;
  min-height: 200px;
`

const VideoBox = styled(Box)`
  height: 300px;

  .vimeo {
    height: 300px;
  }

`
