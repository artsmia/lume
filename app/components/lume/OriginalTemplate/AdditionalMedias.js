import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from '../../mia-ui/modals'
import { Flex, Box } from 'grid-styled'
import ReactPlayer from 'react-player'
import { Icon } from '../../mia-ui/icons'

export default class AdditionalMedias extends Component {
  state = {
    modal: false,
    selectedMediaId: ''
  }

  render() {
    const {
      props: { additionalMedias, organization },
      state: { modal, selectedMediaId }
    } = this

    let selectedMedia = selectedMediaId
      ? this.props.additionalMedias.find(media => media.id === selectedMediaId)
      : null

    return (
      <Flex>
        {additionalMedias.map(media => (
          <MediaBox
            key={media.id}
            onClick={() =>
              this.setState({
                selectedMediaId: media.id,
                modal: true
              })
            }
            justifyContent={'center'}
            alignItems={'center'}
            mx={2}
          >
            <Icon
              icon={media.format === 'mp4' ? 'local_movies' : 'volume_up'}
              title={'Click to Expand'}
              size={'50px'}
            />
          </MediaBox>
        ))}

        <Modal
          open={modal}
          onClose={() =>
            this.setState({
              selectedMediaId: '',
              modal: false
            })
          }
        >
          <VideoContainer justifyContent={'center'} alignItems={'center'}>
            {selectedMedia ? (
              <ReactPlayer
                url={`${process.env.S3_URL}/mia-lume/${
                  selectedMedia.id
                }/original.${selectedMedia.format}`}
                controls={true}
              />
            ) : null}
          </VideoContainer>
        </Modal>
      </Flex>
    )
  }
}

const VideoContainer = styled(Flex)`
  height: 80vh;
  width: 80vh;
`

let MediaBox = styled(Flex)`
  height: 75px;
  width: 75px;
  cursor: pointer;
  border: 1px solid black;
`
