import React, { Component } from "react"
import { Button } from "../../mia-ui/buttons"
import { Input, Label } from "../../mia-ui/forms"
import PropTypes from "prop-types"
import { Flex, Box } from "grid-styled"
import { Modal } from "../../mia-ui/modals"
import Joyride from "react-joyride"

export default class CreateStoryButton extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  }

  state = {
    modal: false,
    title: ""
  }

  render() {
    return (
      <Flex>
        <Button
          onClick={() => this.setState({ modal: true })}
          color={"green"}
          id={"create-story-button"}
        >
          New Story
        </Button>
        <Modal
          open={this.state.modal}
          onClose={() => this.setState({ modal: false })}
        >
          <Label>Story Title</Label>
          <Input
            value={this.state.title}
            name={"title"}
            onChange={this.handleChange}
          />
          <Button onClick={this.createStory} color={"green"}>
            Create
          </Button>
        </Modal>
      </Flex>
    )
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value })

  createStory = async () => {
    try {
      const {
        props: {
          createStory,
          router,
          router: {
            query: { subdomain }
          }
        },
        state: { title }
      } = this

      const {
        data: { createStory: story }
      } = await createStory({ title })

      router.push(
        {
          pathname: "/cms/edit",
          query: {
            subdomain,
            storySlug: story.slug
          }
        },
        `/${subdomain}/${story.slug}`
      )
    } catch (ex) {
      console.error(ex)
    }
  }
}
