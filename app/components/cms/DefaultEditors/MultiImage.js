import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import {Label} from '../../ui/forms'
import Modal from '../../ui/modal'
import ImageManager from '../ImageManager'
import Image from '../../shared/Image'
import router from 'next/router'
import {Column} from '../../ui/layout'

export default class ChangeImage extends Component {

  state = {
    modal: false
  }


  render(){

    const {
      handleModalOpen,
      handleModalClose,
      props: {
        additionalImages,
        label,
        onRemove
      },
      handleAdd,
      state: {
        modal,
      }
    } = this


    return (
      <Container>

        <Label>
          {label}
        </Label>
        {additionalImages.map( image => (
          <Column
            key={image.id}
          >
            <Image
              imageId={image.id}
              height={"50px"}
            />
            <Button
              color={"red"}
              onClick={()=>onRemove(image.id)}
            >
              Remove
            </Button>
          </Column>
        ))}

        <Button
          onClick={handleModalOpen}
        >
          Add
        </Button>



        <Modal
          open={modal}
          onClose={handleModalClose}
          header={`Edit Image`}
          width={"60%"}

        >
          <ImageManager
            onImageSave={handleAdd}
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

  handleAdd = (imageId) => {
    const {
      onAdd,
    } = this.props

    onAdd(imageId)
    this.setState({modal: false})
  }


}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  min-height: 200px;
`
