import React, {Component} from 'react'
import styled from 'styled-components'
import MiaUI from '../index.js'
import {SideMenu, MenuItem} from '../menus'
import Drawer from '../drawer'

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
  grid-template-rows: 50px 400px auto;
  padding: 0px 10px;
`

export const Centered = styled.div`
  height: 100%;
  width: 100%;
  grid-column: 2 / 6;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors.lightMediumGray};
  padding: 20px;
`
