import React, {Component} from 'react'
import styled from 'styled-components'
import MiaUI from '../ui'
import {SideMenu, MenuItem} from '../ui/menus'
import Drawer from '../ui/drawer'

export default class Template extends Component {

  static defaultProps = {
    drawer: true
  }

  render() {
    const {
      props: {
        drawer
      }
    } = this
    return (
      <MiaUI>
        <Container>
          {(drawer) ? (
            <Drawer>
              <SideMenu>
                <MenuItem>
                  Hello
                </MenuItem>
              </SideMenu>
            </Drawer>

          ) : null}


          {this.props.children}


        </Container>
      </MiaUI>
    )
  }



}


const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 80px 400px auto;
  padding: 0px 10px;
  box-sizing: border-box;
`

export const Centered = styled.div`
  grid-column: 2 / 6;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors.lightMediumGray};
  padding: 20px;
`

export const EditContainer = styled.div`
  grid-column: 1 / span 6;
  grid-row: 2 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors.lightMediumGray};
`

export const EditTabContainer = styled.div`
  grid-column: 1 / span 6;
  grid-row: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`
