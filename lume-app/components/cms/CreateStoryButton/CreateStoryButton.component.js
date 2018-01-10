import React, {Component} from 'react'
import {Button} from '../../ui/buttons'
import router from 'next/router'
import PropTypes from 'prop-types'

export default class CreateStoryButton extends Component {

  static propTypes = {
    subdomain: PropTypes.string.isRequired,
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
        subdomain
      } = this.props

      const {data: {createStory: story}} = await createStory()


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
