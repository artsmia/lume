import React, {Component} from 'react'
import {Button} from '../../ui/buttons'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Image from '../Image'
import Zoomer from '../Zoomer'
import {Search} from '../../ui/search'
import {Row} from '../../ui/layout'

const ImageSearch = styled(Search)`
  width: 100px;
`

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
    search: ""
  }

  render() {
    let {
      props: {
        images,
        imageId,
        onImageSave,
        onLoadMore
      },
      state: {
        selectedImageId,
        search
      },
      selectImage,
      handleChange
    } = this

    images = images || []

    return (
      <Container>
        <ThumbColumn>
          <SearchRow>
            <ImageSearch
              value={search}
              name={"search"}
              onChange={handleChange}
            />
            <Button>
              Search
            </Button>
          </SearchRow>

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
          <Button
            onClick={onLoadMore}
          >
            Load More
          </Button>
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


  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

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

const SearchRow = styled(Row)`
  box-sizing: border-box;
  justify-content: center;
`

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
  justify-content: space-around;
  align-items: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
  margin: 10px;
  width: 40%;
  border: 1px solid black;
  overflow-y: scroll;
  box-sizing: border-box;

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
