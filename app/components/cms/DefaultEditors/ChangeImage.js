import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../mia-ui/buttons'
import {Label} from '../../mia-ui/forms'
import {Modal} from '../../mia-ui/modals'
import ImageManager from '../ImageManager'
import router from 'next/router'
import {Flex, Box} from 'grid-styled'
import imgSrcProvider from '../../shared/ImgSrcProvider'

const ImgEl = styled.img`
  height: 100px;
  width: auto;
`

const Img = imgSrcProvider(ImgEl)


export default class ChangeImage extends Component {

  state = {
    modal: false,
    subdomain: 'local'
  }


  render(){

    const {
      handleModalOpen,
      handleModalClose,
      props: {
        image,
        label,
      },
      handleChange,
      state: {
        modal,
        subdomain
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
        <Box
          w={1}
        >
          {(image) ? (
            <Img
              image={image}
            />
          ): null}
        </Box>
        <Box
          w={1}
        >
          <Button
            onClick={handleModalOpen}
          >
            Change
          </Button>
        </Box>






        <Modal
          open={modal}
          onClose={handleModalClose}
        >
          <ImageManager
            subdomain={subdomain}
            onImageSave={handleChange}
          />

        </Modal>
      </Flex>
    )
  }


  componentDidMount(){
    this.setState({subdomain: router.router.query.subdomain})
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

  handleChange = (imageId) => {

    const {
      onChange,
      name
    } = this.props

    onChange({
      target: {
        value: imageId,
        name
      }
    })
    this.setState({modal: false})
  }


}



const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100px;
`
