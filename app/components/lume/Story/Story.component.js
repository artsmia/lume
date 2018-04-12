import React, {Component} from 'react'
import styled from 'styled-components'
import OriginalTemplate from '../OriginalTemplate'
import SliderTemplate from '../SliderTemplate'

export default class Story extends Component {

  render() {

    if (!this.props.story) return null

    switch (this.props.story.template) {
      case "original": {
        return (
          <OriginalTemplate
            {...this.props}
          />
        )
        break
      }
      case "slider": {
        return (
          <SliderTemplate
            story={this.props.story}
          />
        )
        break
      }
      default: {
        return null
        break
      }
    }


  }
}
