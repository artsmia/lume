import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import {Button} from '../../ui/buttons'
import Modal from '../../ui/modal'
import Image from '../../shared/Image'
import {Select, Option} from '../../ui/forms'
import {Input, Textarea, ChangeImage} from '../DefaultEditors'
import ImageManager from '../ImageManager'

export default class StoryEditor extends Component {

  static defaultProps = {
    storyId: PropTypes.string.isRequired,
  }

  initialState = {
    title: "",
    description: "",
    previewImageId: undefined,
    template: "scroller"
  }

  state = {
    ...this.initialState
  }

  render() {

    if (!this.props.story) return null

    const {
      state: {
        title,
        description,
        previewImageId,
        template
      },
      handleChange,
      handleSave
    } = this

    return (
      <Container>
        <H3>
          Story Editor
        </H3>
        <Button
          onClick={handleSave}
        >
          Save
        </Button>
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
        <ChangeImage
          label={"Image"}
          name={"previewImageId"}
          value={previewImageId}
          onChange={handleChange}
        />

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
        let state = {}
        Object.keys(story).forEach(key => {
          Object.assign(state, {
            [key]: story[key] || this.initialState[key]
          })
        })
        this.setState(state)
      }
    }
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleSave = () => {
    this.props.editStory({
      ...this.state,
    })
  }

}

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
`
