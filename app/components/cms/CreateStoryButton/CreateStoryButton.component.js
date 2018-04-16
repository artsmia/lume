import React, {Component} from 'react'
import {Button} from '../../mia-ui/buttons'
import {Input, Label} from '../../mia-ui/forms'
import router from 'next/router'
import PropTypes from 'prop-types'
import {Flex, Box} from 'grid-styled'
import {Modal} from '../../mia-ui/modals'

export default class CreateStoryButton extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired
  }

  state = {
    modal: false,
    title: ''
  }

  render() {
    return (
      <Flex>
        <Button
          onClick={()=>this.setState({modal: true})}
        >
          New Story
        </Button>
        <Modal
          open={this.state.modal}
          onClose={()=>this.setState({modal: false})}
        >
          <Label>
            Story Title
          </Label>
          <Input
            value={this.state.title}
            name={'title'}
            onChange={this.handleChange}
          />
          <Button
            onClick={this.createStory}
          >
            Create
          </Button>
        </Modal>
      </Flex>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  createStory = async () => {
    try {
      const {
        props: {
          createStory,
          router: {
            query: {
              subdomain
            }
          }
        },
        state: {
          title
        }
      } = this

      const {data: {createStory: story}} = await createStory({title})

      this.props.showSnack({
        message: "Story Created"
      })

      router.push({
        pathname: '/cms/edit',
        query: {
          subdomain,
          storySlug: story.slug
        }
      }, `/cms/${subdomain}/${story.slug}`)
    } catch (ex) {
      console.error(ex)
    }
  }

}
