import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../mia-ui/buttons'
import {Label} from '../../mia-ui/forms'
import {Modal} from '../../mia-ui/modals'
import ImageManager from '../ImageManager'
import router from 'next/router'
import {Flex, Box} from 'grid-styled'


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
        onRemove,
        organization
      },
      handleAdd,
      state: {
        modal,
      }
    } = this


    return (
      <Flex
        flexWrap={'wrap'}
      >
        <Box
          w={1}
        >
          <Label>
            {label}
          </Label>
        </Box>

        <Flex
          w={1}
        >
          {additionalImages.map( image => (
            <Flex
              key={image.id}
              flexDirection={'column'}
              mr={1}
            >
              <Img
                src={image.src}
              />
              <Button
                color={"red"}
                onClick={()=>onRemove(image.id)}
              >
                Remove
              </Button>
            </Flex>
          ))}
        </Flex>

        <Box
          w={1}
        >
          <Button
            onClick={handleModalOpen}
          >
            Add
          </Button>
        </Box>


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
      </Flex>
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


const Img = styled.img`
  height: 100px;
  width: auto;
`
