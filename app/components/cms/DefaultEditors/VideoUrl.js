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
        <Column>
          <Label>
            {label}
          </Label>
          <Input
            name={name}
            value={value}
            onChange={onChange}
          />
        </Column>
        <Video
          url={value}
        />
      </Container>
    )
  }
}


const Column = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  align-items: flex-start;

`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  min-height: 300px;
`
