import React, {Component} from 'react'
import Link from 'next/link'
import styled from 'styled-components'

class Tab extends Component {
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
        <TabA>
          {children}
        </TabA>
      </Link>
    )
  }
}

export default Tab

const TabA = styled.a`
  width: 100%;
  height: 50px;
  background-color: ${({selected}) => (selected) ? 'grey' : ''}
`
