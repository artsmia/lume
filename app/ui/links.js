import styled from 'styled-components'
import NextLink from 'next/link'

export const LinkStyled = styled.a`
  color: ${({theme}) => theme.colors.black};
  border-bottom: 1px solid ${({theme}) => theme.colors.transparent};
  text-decoration: none;
  transition: all .4s ease-in-out;
  font-family: ${({theme}) => theme.fonts.light};
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid ${({theme}) => theme.colors.darkGray};
  }
`

export const BoldLinkStyled = styled(LinkStyled)`
  font-family: ${({theme}) => theme.fonts.bold};
  text-transform: uppercase;
  font-size: 1.1rem;
`

export const Link = ({href, as, children}) => (
  <NextLink
    href={href}
    as={as}
  >
    <LinkStyled>
      {children}
    </LinkStyled>
  </NextLink>
)

export const BoldLink = ({href, as, children}) => (
  <NextLink
    href={href}
    as={as}
  >
    <BoldLinkStyled>
      {children}
    </BoldLinkStyled>
  </NextLink>
)
