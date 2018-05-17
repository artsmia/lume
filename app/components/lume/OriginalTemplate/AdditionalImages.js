import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from '../../mia-ui/modals'
import Zoomer from '../../shared/Zoomer'
import { Flex, Box } from 'grid-styled'
import ImgSrcProvider from '../../shared/ImgSrcProvider'

export default class AdditionalImages extends Component {
  state = {
    modal: false,
    selectedImageId: ''
  }

  render() {
    const {
      props: { additionalImages, organization },
      state: { modal, selectedImageId }
    } = this
    return (
      <Flex>
        {additionalImages.map(image => (
          <Box
            key={image.id}
            onClick={() =>
              this.setState({
                selectedImageId: image.id,
                modal: true
              })
            }
            mx={2}
          >
            <Image image={image} title={'Click to Expand'} />
          </Box>
        ))}

        <Modal
          open={modal}
          onClose={() =>
            this.setState({
              selectedImageId: '',
              modal: false
            })
          }
        >
          <ZoomerContainer>
            {selectedImageId ? <Zoomer imageId={selectedImageId} /> : null}
          </ZoomerContainer>
        </Modal>
      </Flex>
    )
  }
}

const ZoomerContainer = styled(Flex)`
  height: 80vh;
  width: 80vh;
`

const ImageEl = styled.img`
  height: 75px;
  width: 75px;
  object-fit: cover;
  cursor: pointer;
`

const Image = ImgSrcProvider(ImageEl)
