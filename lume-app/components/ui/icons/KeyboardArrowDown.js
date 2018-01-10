import React, {Component} from 'react'
import Svg from './Svg'

export default class KeyboardArrowDown extends Component {
  render() {
    return (
      <Svg
        {...this.props}
      >
        <path d={"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"} />
      </Svg>
    )
  }
}
