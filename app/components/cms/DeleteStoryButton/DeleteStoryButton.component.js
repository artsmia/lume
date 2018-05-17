import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from '../../mia-ui/buttons'
import PropTypes from 'prop-types'
import router from 'next/router'
import { Flex, Box } from 'grid-styled'

export default class DeleteStoryButton extends Component {
  static propTypes = {
    storyId: PropTypes.string.isRequired
  }

  state = {
    confirm: false
  }

  render() {
    if (this.state.confirm) {
      return (
        <Container w={1}>
          Are you sure you want to delete this story?
          <Button
            color={'green'}
            onClick={() => this.setState({ confirm: false })}
          >
            Keep
          </Button>
          <Button color={'red'} onClick={this.deleteStory}>
            Delete
          </Button>
        </Container>
      )
    } else {
      return (
        <Container w={1}>
          <Button
            onClick={() => this.setState({ confirm: true })}
            color={'red'}
            id={'delete-story'}
          >
            Delete
          </Button>
        </Container>
      )
    }
  }

  deleteStory = async () => {
    try {
      await this.props.deleteStory()

      let { subdomain } = router.router.query

      router.push(
        {
          pathname: '/cms',
          query: {
            subdomain
          }
        },
        `/cms/${subdomain}`
      )
    } catch (ex) {
      console.error(ex)
    }
  }
}

const Container = styled(Flex)`
  justify-content: center;
  align-items: center;
`
