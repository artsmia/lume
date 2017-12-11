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

export default class StoryEditor extends Component {

  static defaultProps = {
    storyId: PropTypes.string.isRequired,
  }

  state = {
    title: "",
    description: "",
    modalOpen: false,
  }

  render() {

    if (!this.props.story) return null

    const {
      props: {
        story: {
          previewImage
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
      handlePreviewImageSave
    } = this

    return (
      <Container>
        <H3>
          Story Editor
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
            this.props.editStory({
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
          imageId={(previewImage) ? previewImage.id : false}
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
            onImageSave={handlePreviewImageSave}
          />

        </Modal>



      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    if (
      !this.props.story &&
      nextProps.story
    ){
      this.setState({
        title: nextProps.story.title || "",
        description: nextProps.story.description || "",
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

  handlePreviewImageSave = (previewImageId) => {
    this.props.editStory({
      previewImageId
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
