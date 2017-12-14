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

export default class PictureEditor extends Component {

  static defaultProps = {
    pictureId: PropTypes.string.isRequired,
  }

  state = {
    title: "",
    description: "",
    modalOpen: false,
  }

  render() {

    if (!this.props.picture) return null

    const {
      props: {
        picture: {
          image
        }
      },
      state: {
        title,
        description,
        modalOpen,
      },
      handleChange,
      handleModalClose,
      openModal,
      handleImageSave
    } = this

    return (
      <Container>
        <H3>
          Picture Editor
        </H3>
        <Label>Title</Label>
        <Input
          name={"title"}
          value={title}
          onChange={handleChange}
        />
        <Label>Description</Label>
        <Textarea
          name={"description"}
          value={description}
          onChange={handleChange}
        />
        <Button
          onClick={()=>{
            this.props.editPicture({
              title,
              description
            })
          }}
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
      !this.state.pictureId &&
      nextProps.picture
    ){
      this.setState({
        pictureId: nextProps.picture.id,
        title: nextProps.picture.title || "",
        description: nextProps.picture.description || "",
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
    this.props.editPicture({
      imageId
    })
    this.setState({modalOpen: false})
  }


}

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
`
