import React, {Component} from 'react'
import styled from 'styled-components'
import {s3Url} from '../../config'

export default class extends Component {

  static defaultProps = {
    height: "200px",
    quality: "m",
    width: "",
    thumb: false,
    size: "50px",
    selected: false
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
        data: {
          image: {
            organization: {
              id: orgId
            }
          }
        },
        imageId,
        quality,
        thumb,
        size,
        selected,
        onClick,
        height,
        width
      },
      src
    } = this

    if (thumb) {
      return (
        <Thumb
          src={src("s")}
          selected={selected}
          onClick={onClick}
          size={size}
        />
      )
    }


    return (
      <Img
        src={src()}
        onClick={onClick}
        height={height}
        width={width}
      />
    )
  }

  src = (argQuality) => {
    const {
      props: {
        data: {
          image: {
            organization: {
              id: orgId
            }
          }
        },
        imageId,
        thumb,
        size,
        quality
      }
    } = this

    let imgQuality = argQuality || quality

    return `${s3Url}/${orgId}/${imageId}/${imgQuality}`
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
