import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../mia-ui/buttons'
import PropTypes from 'prop-types'
import router from 'next/router'

export default class DeleteStoryButton extends Component {

  static propTypes = {
    storyId: PropTypes.string.isRequired,
  }

  state = {
    confirm: false
  }

  render() {

    if (this.state.confirm) {
      return (
        <Container>
          Are you sure
          <Button
            color={"green"}
            onClick={()=>this.setState({confirm:false})}
          >
            Keep
          </Button>
          <Button
            color={"red"}
            onClick={this.deleteStory}
          >
            Delete
          </Button>

        </Container>
      )
    } else {
      return (
        <Container>
          <Button
            onClick={()=>this.setState({confirm: true})}
            color={"red"}
          >
            Delete
          </Button>
        </Container>
      )
    }
  }

  deleteStory = async() => {
    try {
      await this.props.deleteStory()

      let {
        subdomain
      } = router.router.query

      router.push({
        pathname: '/cms',
        query: {
          subdomain
        }
      }, `/${subdomain}/cms`)


    } catch (ex) {
      console.error(ex)
    }
  }

}

const Container = styled.div`
  display: flex;
  height: 100%;
`
