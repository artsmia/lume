import React, { Component } from 'react'
import { Button } from '../../mia-ui/buttons'
import PropTypes from 'prop-types'

export default class CreateContentButton extends Component {
  static propTypes = {
    storyId: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['comparison', 'picture', 'movie', 'obj', 'detail'])
      .isRequired
  }

  render() {
    return (
      <Button onClick={this.createContent} id={'create-content'}>
        Create Content
      </Button>
    )
  }

  createContent = async () => {
    try {
      const { createContent } = this.props

      const {
        data: { createContent: content }
      } = await createContent()
    } catch (ex) {
      console.error(ex)
    }
  }
}
