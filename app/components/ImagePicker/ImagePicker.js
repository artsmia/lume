import React, {Component} from 'react'
import styled from 'styled-components'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {Container, ThumbColumn, Right, Preview, ImgThumb} from './styled'

export default class ImagePicker extends Component {

  state = {
    selectedImageId: this.props.initialImageId,
  }

  render() {
    const {
      props: {
        organization,
        images,
        initialImageId
      },
      state: {
        selectedImageId,
      },
      selectImage,
    } = this
    return (
      <Container>
        <ThumbColumn>
          {images.map( (image) => (
            <ImgThumb
              key={image.id}
              src={`https://s3.amazonaws.com/${organization.id}/${image.id}--s`}
              onClick={()=>{selectImage(image.id)}}
              selected={(selectedImageId === image.id)}
            />
          ))}
          {(images.length < 1) ? (
            <p>You don't have any images yet</p>
          ):null}
        </ThumbColumn>
        <Right>
          <Preview
            src={`https://s3.amazonaws.com/${organization.id}/${selectedImageId}`}
          />

        </Right>

      </Container>
    )
  }


  selectImage = (selectedImageId) => {
    this.setState({selectedImageId})
    this.props.onImageSelection(selectedImageId)
  }

}
