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
              as={`/cms/browse/groups`}
            >
              Groups
            </MenuItem>
            <MenuItem
              href={{
                pathname: `/cms/browse/items`
              }}
              as={`/cms/browse/items`}
            >
              Items
            </MenuItem>
          </SideMenu>
        </SideMenuContainer>

        <Content>
          {children}
        </Content>


      </Container>
    )
  }
}


const Container = styled.div`
  display: grid;
  grid-template-columns: [side] 150px [left] 1fr [right] 1fr;
  grid-template-rows: [bar] 50px [head] 250px [rest] auto;
`

const Content = styled.div`
  grid-column: left / 2;
  grid-row: head / 2;
  padding-left: 150px;
`


const SideMenuContainer = styled.div`
  grid-column: side / left;
  grid-row: head / span 2;
`
