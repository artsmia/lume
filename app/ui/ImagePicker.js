import React, {Component} from 'react'
import {Button} from './buttons'
import styled from 'styled-components'
import {s3Url} from '../config'

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
              src={`${s3Url}/${organization.id}/${image.id}--s`}
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
            src={`${s3Url}/${organization.id}/${selectedImageId}`}
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


export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 600px;
`


export const ThumbColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  margin: 10px;
  width: 40%;
  border: 1px solid black;
`

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 10px;
  width: 60%;
  border: 1px solid black;
`
export const Preview = styled.img`
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: contain;
  padding: 10px;
  box-sizing: border-box;
`

export const ImgThumb = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  box-shadow: ${({selected}) => (selected) ? '0 0 10px blue' : 'none'};
`
