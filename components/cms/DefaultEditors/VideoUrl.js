import React, {Component} from 'react'
import styled from 'styled-components'
import {Label, Input} from '../../ui/forms'
import Video from '../../ui/video'

export default class VideoUrl extends Component {

  render(){
    const {
      label,
      name,
      value,
      onChange
    } = this.props
    return (
      <Container>
        <Label>
          {label}
        </Label>
        <Input
          name={name}
          value={value}
          onChange={onChange}
        />
        <Video
          url={value}
        />
      </Container>
    )
  }
}


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`
