import React, {Component} from 'react'

export default class Svg extends Component {

  static defaultProps = {
    viewBox:'0 0 24 24',
    height: 24,
    width: 24,
    fill: "black",
  }

  render() {

    const {
      props,
      props: {
        children
      }
    } = this

    return (
      <svg
        xmlns="http://www.w3.org/svg/2000"
        {...props}
      >
        {children}
      </svg>
    )
  }
}
