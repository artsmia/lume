import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import {Label} from '../../ui/forms'
import Modal from '../../ui/modal'
import ImageManager from '../ImageManager'
import Image from '../../shared/Image'


export default class ChangeImage extends Component {

  state = {
    modal: false
  }

  render(){

    const {
      handleModalOpen,
      handleModalClose,
      props: {
        subdomain,
        imageId,
      },
      handleImageSave,
      state: {
        modal
      }
    } = this

    return (
      <Container>

        <Label>
          Image 1
        </Label>
        <Image
          imageId={imageId}
        />
        <Button
          onClick={handleModalOpen}
        >
          Change
        </Button>



        <Modal
          open={modal}
          onClose={handleModalClose}
          header={`Edit Image`}
          width={"60%"}

        >
          <ImageManager
            subdomain={subdomain}
            onImageSave={handleImageSave}
          />

        </Modal>
      </Container>
    )
  }


  handleModalOpen = () => {
    this.setState({
      modal: true
    })
  }

  handleModalClose = () => {
    this.setState({
      modal: false
    })
  }

  handleImageSave = (imageId) => {
    this.props.onImageSave(imageId)
    this.setState({modal: false})
  }


}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
