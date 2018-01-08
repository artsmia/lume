import React, {Component} from 'react'
import styled from 'styled-components'
import OriginalTemplate from '../OriginalTemplate'

export default class Story extends Component {

  render() {

    if (!this.props.story) return null

    if(this.props.story.template === 'original') {
      return (
        <OriginalTemplate
          story={this.props.story}
        />
      )
    } else {
      return null
    }
  }
}

const Container = styled.div`

`
