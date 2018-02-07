import React, {Component} from 'react'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'

export default class CreateStoryButton extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired
  }

  render() {
    return (
      <Button
        onClick={this.createStory}
      >
        Create Story
      </Button>
    )
  }

  createStory = async () => {
    try {
      const {
        createStory,
        router: {
          query: {
            subdomain
          }
        }
      } = this.props

      const {data: {createStory: story}} = await createStory()

      this.props.showSnack({
        message: "Story Created"
      })

      router.push({
        pathname: '/cms/edit',
        query: {
          subdomain,
          storyId: story.id
        }
      }, `/${subdomain}/cms/${story.id}`)
    } catch (ex) {
      console.error(ex)
    }
  }

}
