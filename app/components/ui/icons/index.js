import styled from 'styled-components'
import paths from 'material-design-icons-svg/paths'
import Icon from 'material-design-icons-svg'

const icon = Icon(paths)

import React, {Component} from 'react'

export default class extends Component {


  render() {

    let iconString = icon.getSVG(this.props.icon)

    let [,d] = new RegExp(/d="(.+)"/g).exec(iconString)

    return (
      <svg
        height={"24"}
        width={"24"}
        fill={this.props.fill}
        xmlns="http://www.w3.org/svg/2000"
      >
        <path
          d={d}
        />
      </svg>
    )
  }
}
