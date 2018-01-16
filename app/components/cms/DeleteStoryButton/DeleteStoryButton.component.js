import React, {Component} from 'react'
import {Button} from '../../ui/buttons'
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
        <div>
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

        </div>
      )
    } else {
      return (
        <Button
          onClick={()=>this.setState({confirm: true})}
          color={"red"}
        >
          Delete
        </Button>
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
