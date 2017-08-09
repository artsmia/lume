import styled from 'styled-components'
import {BoldLink} from './links'
import NextLink from 'next/link'

export const SideMenu = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
`

const Li = styled.li`
  list-style: none;
  width: 100%;
  padding: 10px 5px;
  background-color: ${({theme}) => theme.colors.white};
  transition: .2s all;
  box-sizing: border-box;
  &:hover {
    background-color: ${({theme}) => theme.colors.grey};
  }
`

export const MenuItem = ({as, href, children}) => (
  <Li>
    <BoldLink
      as={as}
      href={href}
    >
      {children}
    </BoldLink>
  </Li>
)
