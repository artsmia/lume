import React, {Component} from 'react'
import styled from 'styled-components'
import {s3Url} from '../../config'

export default class extends Component {

  static defaultProps = {
    height: "200px",
    quality: "m",
    width: "",
    thumb: false,
    size: "50px"
  }

  render () {
    if (
      this.props.data.loading
    ) return null

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
      },
      src
    } = this

    if (!imageId) {
      return null
    }

    if (thumb) {
      return (
        <Thumb
          src={src("s")}
        />
      )
    }


    return (
      <Img
        src={src()}
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
`

const Thumb = styled.img`
  height: ${({size}) => size};
  height: ${({size}) => size};
`
