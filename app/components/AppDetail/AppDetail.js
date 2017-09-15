import React, {Component} from 'react'
import styled from 'styled-components'
import {H3} from '../../ui/h'
import {Column, Row} from '../../ui/layout'
import Image from '../Image'
import AppClip from '../AppClip'

export default class extends Component {

  static defaultProps = {
    selected: false,
    onDetailSelection(detail){console.log(detail)}
  }

  render() {

    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          detail,
          detail: {
            id: detailId,
            title,
            image,
            clips
          }
        },
        selected,
        selectedClip,
        handleClipSelection
      },
      handleSelection
    } = this

    return (
      <Container>
        <Header
          onClick={handleSelection}
        >
          {(image) ? (
            <Image
              imageId={image.id}
              thumb
            />
          ): null}
          <H3>
            {title}
          </H3>
        </Header>
        {(selected) ? (
          <ClipsContainer>
            {clips.map( clip => (
              <AppClip
                key={clip.id}
                clipId={clip.id}
                onClipSelection={handleClipSelection}
                selected={(clip.id === selectedClip.id)}
              >
                {clip.id}
              </AppClip>
            ))}
          </ClipsContainer>
        ): null}


      </Container>
    )
  }

  handleSelection = () => {
    const {
      onDetailSelection,
      handleClipSelection,
      data: {
        detail,
        detail: {
          clips: [
            clip
          ]
        }
      }
    } = this.props

    onDetailSelection(detail)
    handleClipSelection(clip)

  }

}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px;
  border: 1px solid lightgrey;
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const ClipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 20px;
  width: 100%;
  box-sizing: border-box;
`
