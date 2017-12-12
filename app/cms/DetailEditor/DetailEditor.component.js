import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import {Button} from '../../ui/buttons'
import Modal from '../../ui/modal'
import Image from '../../shared/Image'
import {Input, Textarea, Label} from '../../ui/forms'
import ImageManager from '../ImageManager'
import router from 'next/router'

export default class DetailEditor extends Component {

  static defaultProps = {
    detailId: PropTypes.string.isRequired,
  }

  state = {
    title: "",
    description: "",
    modalOpen: false,
  }

  render() {

    if (!this.props.detail) return null

    const {
      props: {
        detail: {
          image
        }
      },
      state: {
        title,
        modalOpen,
      },
      handleChange,
      handleModalClose,
      openModal,
      handleImageSave,
      handleSave
    } = this

    return (
      <Container>
        <H3>
          Detail Editor
        </H3>
        <Label>Title</Label>
        <Input
          name={"title"}
          value={title}
          onChange={handleChange}
        />
        <Label>Description</Label>

        <Button
          onClick={handleSave}
        >
          Save
        </Button>

        <Label>
          Image 1
        </Label>
        <Image
          imageId={(image) ? image.id : false}
        />
        <Button
          onClick={openModal}
        >
          Change
        </Button>



        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          header={`Edit Preview Image`}
          width={"60%"}

        >
          <ImageManager
            subdomain={this.props.subdomain}
            onImageSave={handleImageSave}
          />

        </Modal>



      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    if (
      !this.state.detailId &&
      nextProps.detail
    ){
      this.setState({
        detailId: nextProps.detail.id,
        title: nextProps.detail.title || "",
        description: nextProps.detail.description || "",
      })
    }
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  openModal = () => {
    this.setState({
      modalOpen: true
    })
  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  handleImageSave = (imageId) => {
    this.props.editDetail({
      imageId
    })
    this.setState({modalOpen: false})
  }

  handleSave = () => {

  }

}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
