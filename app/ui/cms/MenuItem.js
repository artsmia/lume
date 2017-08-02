import React, {Component} from 'react'
import styled from 'styled-components'
import Link from 'next/link'

export default class MenuItem extends Component {
  render() {
    const {
      children,
      href,
      as,
    } = this.props
    return (
      <Link
        as={as}
        href={href}
      >
        <Container>
          {children}
        </Container>
      </Link>
    )
  }


}

const Container = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: darkgrey;
  color: white;
  font-weight: bold;
  cursor: pointer;
`
