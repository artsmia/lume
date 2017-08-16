import React, {Component} from 'react'
import styled from 'styled-components'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'

export default class ImagePicker extends Component {


  render() {
    const {
      organization,
      images
    } = this.props
    return (
      <Column>
        <Row>
          <Column>
            {images.map( (image) => (
              <Thumb
                key={image.id}
                src={`https://s3.amazonaws.com/${organization.id}/${image.id}`}
              />
            ))}
          </Column>
        </Row>
        <Button>
          Choose Image
        </Button>
      </Column>
    )
  }

}


const Thumb = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
`
