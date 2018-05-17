import React, { Component } from 'react'
import styled from 'styled-components'
import OriginalTemplate from '../OriginalTemplate'
import SliderTemplate from '../SliderTemplate'
import { withRouter } from 'next/router'
import organizationQuery from '../../../apollo/queries/organization'
import { compose } from 'react-apollo'

class Story extends Component {
  render() {
    switch (this.props.story.template) {
      case 'original': {
        return <OriginalTemplate {...this.props} />
        break
      }
      case 'slider': {
        return <SliderTemplate {...this.props} />
        break
      }
      default: {
        return null
        break
      }
    }
  }
}

let ExportComponent = compose(organizationQuery)(Story)

export default withRouter(ExportComponent)
