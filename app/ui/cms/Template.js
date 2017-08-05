import React, {Component} from 'react'
import styled from 'styled-components'
import {SideMenu, MenuItem} from '../menus'


export default class Template extends Component {
  render() {
    const {
      children
    } = this.props
    return (
      <Container>

        <SideMenuContainer>
          <SideMenu>
            <MenuItem
              href={{
                pathname: `/cms/browse/groups`
              }}
              as={`/cms/groups`}
            >
              Groups
            </MenuItem>
            <MenuItem
              href={{
                pathname: `/cms/browse/items`
              }}
              as={`/cms/items`}
            >
              Items
            </MenuItem>
          </SideMenu>
        </SideMenuContainer>

        {children}


      </Container>
    )
  }
}


const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: [side] 150px [left] 1fr [right] 1fr;
  grid-template-rows: [bar] 50px [head] 250px [rest] auto;
`
//
// export const Content = styled.div`
//   grid-column: left / 2;
//   grid-row: rest;
//   padding-left: 150px;
// `


const SideMenuContainer = styled.div`
  grid-column: side / left;
  grid-row: head / span 2;
`

export const Top = styled.div`
  grid-column: left / span 2;
  grid-row: head;
  padding-left: 150px;
`

export const Bottom = styled.div`
  grid-column: left / span 2;
  grid-row: rest;
  padding-left: 150px;
`
