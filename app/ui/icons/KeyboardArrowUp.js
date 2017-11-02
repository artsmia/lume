import React, {Component} from 'react'
import Svg from './Svg'


export default class KeyboardArrowDown extends Component {
  render() {
    return (
      <Svg
        {...this.props}
      >
        <path d={'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z'} />
      </Svg>
    )
  }
}
