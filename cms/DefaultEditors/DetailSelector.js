import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import {Label} from '../../ui/forms'
import Zoomer from '../../shared/Zoomer'

export default class DetailSelector extends Component {

  state = {
    modal: false
  }

  render(){

    const {
      props: {
        value,
        label,
        imageId,
        geometry
      },
      handleCrop,
      state: {
        modal
      }
    } = this


    return (
      <Container>

        <Label>
          {label}
        </Label>
        <ZoomerContainer>
          <Zoomer
            geometry={geometry}
            imageId={imageId}
            onCrop={handleCrop}
            crop={true}
          />
        </ZoomerContainer>

      </Container>
    )
  }

  handleCrop = (value) => {
    const {
      onChange,
      name
    } = this.props

    onChange({
      target: {
        value,
        name
      }
    })
  }




}

const ZoomerContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  min-height: 500px;
`
