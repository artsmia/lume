import React, {Component} from 'react'
import styled from 'styled-components'

export default class Icon extends Component {

  static defaultProps = {
    icon: "face",
    size: "24px",
    color: "black"
  }

  render() {

    const {
      icon,
      color,
      size
    } = this.props

    return (
      <I
        className={"material-icons"}
        color={color}
        size={size}
      >
        {icon}
      </I>
    )
  }
}


const I = styled.i`
  font-size: ${({size}) => size};
  color: ${({color}) => color};
`
