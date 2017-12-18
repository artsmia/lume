import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import {Button} from '../../ui/buttons'
import Modal from '../../ui/modal'
import Image from '../../shared/Image'
import {Input, Textarea, Label, Select, Option} from '../../ui/forms'
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
    template: "scroller"
  }

  render() {

    if (!this.props.story) return null

    const {
      props: {
        story: {
          previewImage
        },
        subdomain
      },
      state: {
        title,
        description,
        modalOpen,
        template
      },
      handleChange,
      handleModalClose,
      openModal,
      handlePreviewImageSave,
      handleSave
    } = this

    return (
      <Container>
        <H3>
          Story Editor
        </H3>
        <Select
          name={"template"}
          onChange={handleChange}
          value={template}
        >
          <Option
            value={"scroller"}
          >
            {"scroller"}
          </Option>
          <Option
            value={"slider"}
          >
            {"slider"}
          </Option>
        </Select>
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
          onClick={handleSave}
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
            subdomain={subdomain}
            onImageSave={handlePreviewImageSave}
          />

        </Modal>



      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    if (
      !this.state.storyId &&
      nextProps.story
    ){
      this.setState({
        storyId: nextProps.story.id,
        title: nextProps.story.title || "",
        template: nextProps.story.template || "",
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

  handleSave = () => {
    const {
      props: {
        editStory,
      },
      state: {
        title,
        description,
        template
      }
    } = this

    console.log(template)

    editStory({
      title,
      description,
      template
    })
  }

}

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
`
