import React, {Component} from 'react'
import styled from 'styled-components'
import {s3Url, googleApiKey} from '../../config'
import {Spinner} from '../../ui/spinner'

export default class extends Component {

  static defaultProps = {
    height: "200px",
    quality: "m",
    width: "",
    thumb: false,
    size: "50px",
    selected: false
  }

  state = {
    src: ""
  }

  render () {

    if (
      this.props.data.loading
    ) return null

    if (!this.props.imageId) {
      return null
    }

    const {
      props: {
        thumb,
        size,
        selected,
        onClick,
        height,
        width
      },
      state: {
        src
      }
    } = this

    if (!src) return (
      <SpinnerBox
        height={height}
        width={width}
        size={size}
      >
        <Spinner/>
      </SpinnerBox>
    )

    if (thumb) {
      return (
        <Thumb
          src={src}
          selected={selected}
          onClick={onClick}
          size={size}
        />
      )
    }


    return (
      <Img
        src={src}
        onClick={onClick}
        height={height}
        width={width}
      />
    )
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.data.image) {
      this.generateSrc(nextProps)
    }
  }


  generateSrc = async (nextProps) => {
    try {
      const {
        data: {
          image: {
            id: imgId,
            host,
            gdriveId,
            organization: {
              id: orgId,
            },
          }
        },
        quality
      } = nextProps

      let imgQuality = quality || 'm'

      if (
        host === 'gdrive' &&
        gdriveId
      ){
        let src = await this.getGoogleUrl(gdriveId,imgQuality)
        this.setState({src})
      } else {
        this.setState({src: `https://s3.amazonaws.com/${orgId}/${imgId}/${imgQuality}`})
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  getGoogleUrl = async(parentId, imgQuality) => {
    try {

      let url = `https://www.googleapis.com/drive/v3/files/?key=${googleApiKey}&q='${parentId}' in parents and name contains '${imgQuality}' and mimeType contains 'image'&fields=files(id,name,webContentLink)`
      let options = {
        method: 'GET'
      }

      const response = await fetch(url, options)

      const {files} = await response.json()

      return files[0].webContentLink


    } catch (ex) {
      console.error(ex)
    }
  }



}

const Img = styled.img`
  height: ${({height}) => height};
  width: ${({width}) => width};
  object-fit: contain;
  margin: 10px;
`

const Thumb = styled.img`
  height: ${({size}) => size};
  width: ${({size}) => size};
  box-shadow:  ${({theme, selected}) => (selected) ? `0 0 10px 5px ${theme.colors.purple}` : ""};
  object-fit: cover;
  margin: 10px;
`

const SpinnerBox = styled.div`
  height: ${({height, size}) => height || size || '50px'};
  width: ${({width, size}) => width || size || '50px'};
  display: flex;
  justify-content: center;
  align-items: center;
`
