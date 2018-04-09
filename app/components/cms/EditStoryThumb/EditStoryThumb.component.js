import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../mia-ui/text'
import {Loading} from '../../mia-ui/loading'
// import Image from '../../shared/Image'
import {Flex, Box} from 'grid-styled'
import getImageSrc from '../../../utils/getImageSrc'
import {gray60} from '../../mia-ui/colors'
import {Icon} from '../../mia-ui/icons'
import {ThumbImage, ThumbOverlay, ThumbContainer} from '../../mia-ui/lume'


export default class EditStoryThumb extends Component {

  static defaultProps = {
    onSelect: PropTypes.func.isRequired,
    storyId: PropTypes.string.isRequired,

  }

  render() {

    if (!this.props.story) return <Loading/>

    const {
      story: {
        title,
        previewImage
      },
      onSelect,
      organization,
      selected
    } = this.props


    return (
      <ThumbContainer
        onClick={onSelect}
        width={1}
        selected={selected}
      >
        {previewImage ? (
          <ThumbImage
            src={getImageSrc({
              organization,
              image: previewImage,
              quality: 's'
            })}
          />          
        ): null}

        <ThumbOverlay>
          <H3
            color={"white"}
          >
            Story Information
          </H3>
          <Icon
            color={'white'}
            icon={'book'}
          />
        </ThumbOverlay>
      </ThumbContainer>
    )
  }


}
