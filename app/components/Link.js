import React, {Component} from 'react'
import Link from 'next/link'


export default class MiaLink extends Component {

  static displayName = "Link"



  render() {
    const {
      href,
      as,
      children
    } = this.props
    return (
      <Link
        href={href}
        as={as}
      >
        <a>
          {children}
        </a>
      </Link>
    )
  }


}
