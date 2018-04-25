import React, {Component} from 'react'
import {Button} from '../../mia-ui/buttons'
import PropTypes from 'prop-types'

export default class DeleteContentButton extends Component {

  static propTypes = {
    contentId: PropTypes.string.isRequired,
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
            onClick={this.props.deleteContent}
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

}
