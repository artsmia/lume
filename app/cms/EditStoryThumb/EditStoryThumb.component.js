import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import Image from '../../shared/Image'

export default class EditStoryThumb extends Component {

  static defaultProps = {
    onSelect: PropTypes.func.isRequired,
    storyId: PropTypes.string.isRequired,

  }

  render() {

    if (!this.props.story) return (
      <Container>
        <Spinner/>
      </Container>
    )

    const {
      story: {
        title,
        previewImage
      },
      onSelect
    } = this.props

    return (
      <Container
        onClick={onSelect}
      >
        <H3>
          {title}
        </H3>
        {(previewImage) ? (
          <Image
            imageId={previewImage.id}
            height={"50px"}
          />
        ): null}
      </Container>
    )
  }


}

const Container = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid black;
`
