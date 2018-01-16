import styled from 'styled-components'
import NextLink from 'next/link'

export const LinkStyled = styled.a`
  color: ${({theme}) => theme.colors.black};
  border-bottom: 1px solid ${({theme}) => theme.colors.lightMediumGray};
  text-decoration: none;
  transition: all .4s ease-in-out;
  font-family: ${({theme}) => theme.fonts.light};
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid ${({theme}) => theme.colors.black};
  }
`

export const BoldLinkStyled = styled(LinkStyled)`
  font-family: ${({theme}) => theme.fonts.bold};
  text-transform: uppercase;
  font-size: 1.1rem;
  border-bottom: 1px solid ${({theme}) => theme.colors.transparent};
`

export const Link = ({href, as, children}) => (
  <NextLink
    href={href}
    as={as}
  >
    <LinkStyled
      href={as}
    >
      {children}
    </LinkStyled>
  </NextLink>
)

export const BoldLink = ({href, as, children}) => (
  <NextLink
    href={href}
    as={as}
  >
    <BoldLinkStyled
      href={as}
    >
      {children}
    </BoldLinkStyled>
  </NextLink>
)
