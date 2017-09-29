import React, {Component} from 'react'
import {Button} from '../../ui/buttons'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Image from '../Image'
import Zoomer from '../Zoomer'

export default class ImagePicker extends Component {

  static defaultProps = {
    images: [],
  }

  static propTypes = {
    images: PropTypes.array,
    imageId: PropTypes.string,
    onImageSave: PropTypes.func,
  }

  state = {
    selectedImageId: "",
  }

  render() {
    const {
      props: {
        images,
        imageId,
        onImageSave
      },
      state: {
        selectedImageId
      },
      selectImage
    } = this
    return (
      <Container>
        <ThumbColumn>
          {images.map( (image) => (
            <Image
              key={image.id}
              imageId={image.id}
              onClick={()=>{selectImage(image.id)}}
              selected={(selectedImageId === image.id)}
              size={"80px"}
              thumb
            />
          ))}
          {(images.length < 1) ? (
            <p>You don't have any images yet</p>
          ):null}
        </ThumbColumn>
        <Right>
          {(selectedImageId) ? (
            <Zoomer
              imageId={selectedImageId}
            />
          ): <p>Choose an image from the left</p>}
        </Right>

      </Container>
    )
  }


  selectImage = (selectedImageId) => {
    this.setState({selectedImageId})
    this.props.onImageSave(selectedImageId)
  }

  componentDidMount(){
    const {
      imageId,
    } = this.props
    if (imageId) {
      this.setState({selectedImageId: imageId})
    }
  }

  componentWillReceiveProps({imageId, images}) {
    if (imageId) {
      this.setState({selectedImageId: imageId})
    }
    if (
      !imageId &&
      images.length > 0
    ) {
      this.setState({selectedImageId: images[0].id})
    }

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
  align-items: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
  margin: 10px;
  width: 40%;
  border: 1px solid black;
  overflow-y: scroll;
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
