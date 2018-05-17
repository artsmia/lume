import React, { Component } from 'react'
import styled from 'styled-components'
import { Label, Input } from '../../mia-ui/forms'
import Video from '../../mia-ui/video'
import { Flex, Box } from 'grid-styled'

export default class VideoUrl extends Component {
  render() {
    const { label, name, value, onChange } = this.props
    return (
      <Flex alignItems={'center'} flexWrap={'wrap'}>
        <Box my={2} w={1}>
          <Label>{label}</Label>
          <Input name={name} value={value} onChange={onChange} />
        </Box>
        <Box w={[1]}>
          <Video url={value} />
        </Box>
      </Flex>
    )
  }
}
