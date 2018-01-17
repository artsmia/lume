import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import {Button} from '../../ui/buttons'
import Modal from '../../ui/modal'
import Image from '../../shared/Image'
import {Select, Option, Label} from '../../ui/forms'
import {Input, Textarea, ChangeImage} from '../DefaultEditors'
import ImageManager from '../ImageManager'
import DeleteStoryButton from '../DeleteStoryButton'
import StoryAssociator from '../StoryAssociator'

export default class StoryEditor extends Component {

  static defaultProps = {
    storyId: PropTypes.string.isRequired,
  }

  initialValues = {
    title: "",
    description: "",
    previewImageId: undefined,
    template: "original",
    visibility: "draft"
  }

  state = {
    ...this.initialValues,
    sync: true
  }

  render() {

    if (!this.props.story) return null

    const {
      state: {
        title,
        description,
        previewImageId,
        template,
        sync,
        visibility
      },
      handleChange,
      handleSave,
      props: {
        storyId
      }
    } = this

    return (
      <Container>
        <Top>
          <H3>
            Story Editor
          </H3>
          <Button
            onClick={handleSave}
            disabled={sync}
          >
            {(sync) ? "Saved" : "Save"}
          </Button>
        </Top>
        <Row>
          <Column>
            <Label>
              Template
            </Label>
            <Select
              name={"template"}
              onChange={handleChange}
              value={template}
            >
              <Option
                value={"original"}
              >
                Original
              </Option>
              <Option
                value={"slider"}
              >
                Slider
              </Option>
            </Select>
            <Label>
              Visibility
            </Label>
            <Select
              name={"visibility"}
              onChange={handleChange}
              value={visibility}
            >

              <Option
                value={"draft"}
              >
                Draft
              </Option>
              <Option
                value={"published"}
              >
                Published
              </Option>
            </Select>
            <Input
              label={"Title"}
              name={"title"}
              value={title}
              onChange={handleChange}
            />
            <Textarea
              label={"Description"}
              name={"description"}
              value={description}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <ChangeImage
              label={"Image"}
              name={"previewImageId"}
              value={previewImageId}
              onChange={handleChange}
            />
            <StoryAssociator
              storyId={storyId}
            />
            <DeleteStoryButton
              storyId={storyId}
            />
          </Column>
        </Row>

      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    if (
      nextProps.story
    ){
      if (
        nextProps.story.id !== this.state.id
      ) {
        let {
          story
        } = nextProps
        let state = {
          previewImageId: (story.previewImage) ? story.previewImage.id : undefined
        }
        Object.keys(story).forEach(key => {
          Object.assign(state, {
            [key]: story[key] || this.initialValues[key]
          })
        })

        this.setState(state)
      }
    }
  }

  handleChange = ({target: {value, name}}) => {
    this.setState({
      [name]: value,
      sync: false
    })
  }

  handleSave = async () => {
    try {
      await this.props.editStory({
        ...this.state,
      })
      this.setState({
        sync: true
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  componentWillUnmount(){
    if (!this.state.sync){
      this.handleSave()
    }
  }

}

const Top = styled.div`
  display: flex;
  justify-content:space-between;
  min-height: 70px;
  width: 100%;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  box-sizing:border-box;
  overflow-y:scroll;
`



const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 50%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 400px;
`
