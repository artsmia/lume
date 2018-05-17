import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import { gray30, black, transparent } from './colors'
import { light, bold } from './fonts'

export const A = styled.a`
  cursor: pointer;
  text-decoration: none;
`

const LinkStyled = styled.a`
  color: ${black};
  border-bottom: 1px solid ${gray30};
  text-decoration: none;
  transition: all 0.4s ease-in-out;
  ${light} cursor: pointer;
  &:hover {
    border-bottom: 1px solid ${black};
  }
`

const BoldLinkStyled = styled(LinkStyled)`
  ${bold} text-transform: uppercase;
  font-size: 1.1rem;
  border-bottom: 1px solid ${transparent};
`

export const NextA = ({ href, as, children }) => (
  <NextLink href={href} as={as}>
    <A href={as}>{children}</A>
  </NextLink>
)

export const Link = ({ href, as, children, bold }) => (
  <NextLink href={href} as={as}>
    {bold ? (
      <BoldLinkStyled href={as}>{children}</BoldLinkStyled>
    ) : (
      <LinkStyled href={as}>{children}</LinkStyled>
    )}
  </NextLink>
)
