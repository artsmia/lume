import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from '../../mia-ui/buttons'
import { Label } from '../../mia-ui/forms'
import { Modal } from '../../mia-ui/modals'
import ImageManager from '../ImageManager'
import router from 'next/router'
import { Flex, Box } from 'grid-styled'
import imgSrcProvider from '../../shared/ImgSrcProvider'
import Joyride from 'react-joyride'

const ImgEl = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
  transition: 0.2s all;

  &:hover {
    transform: scale(1.05);
  }
`

const Img = imgSrcProvider(ImgEl)

export default class ChangeImage extends Component {
  state = {
    modal: false,
    subdomain: 'local'
  }

  // handleDemoChange = async ({action, index, lifecycle, step}) => {
  //   try {
  //
  //   } catch (ex) {
  //     console.error(ex)
  //   }
  // }
  render() {
    const {
      handleModalOpen,
      handleModalClose,
      props: { image, label, id },
      handleChange,
      state: { modal, subdomain }
    } = this

    return (
      <Flex flexDirection={'column'} alignItems={'flex-start'}>
        <Box>
          <Label>{label}</Label>
        </Box>
        <ImageBox onClick={handleModalOpen} id={this.props.id}>
          {image ? <Img image={image} /> : null}
          <ChangeButton onClick={handleModalOpen}>Change</ChangeButton>
        </ImageBox>

        <Modal open={modal} onClose={handleModalClose}>
          {modal ? (
            <ImageManager
              subdomain={subdomain}
              onImageSave={handleChange}
              onDemoFinish={this.props.onDemoFinish}
              showDemo={this.props.showDemo}
              //tour={this.props.tour}
            />
          ) : null}
        </Modal>
        {/* <Joyride
          run={this.props.showDemo ? true : false}
          steps={this.state.demoSteps}
          stepIndex={this.state.demoIndex}
          callback={this.handleDemoChange}
          styles={{
            buttonClose: {
              display: 'none'
            },
            buttonNext: {
              display: 'none'
            },
            buttonBack: {
              display: 'none'
            }
          }}
        /> */}
      </Flex>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showDemo) {
      this.handleModalOpen()
    }
    if (!nextProps.showDemo && this.state.modal) {
      this.handleModalClose()
    }
  }

  componentDidMount() {
    this.setState({ subdomain: router.router.query.subdomain })
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

  handleChange = imageId => {
    const { onChange, name } = this.props

    onChange({
      target: {
        value: imageId,
        name
      }
    })
    this.setState({ modal: false })
  }
}

const ImageBox = styled(Flex)`
  height: 130px;
  width: 130px;
  position: relative;
  border: 1px solid black;
`
const ChangeButton = styled(Button)`
  position: absolute;
  height: 40px;
  display: flex;
  align-self: flex-end;
  width: 100%;
  justify-content: center;
  margin: 0;
  border: 0;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100px;
`
