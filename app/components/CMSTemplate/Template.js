import React, {Component} from 'react'
import styled from 'styled-components'
import MiaUI from '../../ui'
import {SideMenu, MenuItem} from '../../ui/menus'
import Drawer from '../../ui/drawer'

export default class Template extends Component {

  static defaultProps = {
    drawer: true
  }

  render() {
    if (this.props.data.loading) {
      return null
    }
    const {
      props: {
        drawer,
        data: {
          user: {
            email
          }
        },
        orgSub,
      },
    } = this
    return (
      <MiaUI>
        <Container>
          {(drawer) ? (
            <Drawer>
              <SideMenu>
                <h2>{email}</h2>
                <MenuItem
                  href={{
                    pathname: '/cms/browse/items',
                    query: {
                      orgSub
                    }
                  }}
                  as={`/${orgSub}/cms/items`}
                >
                  Items
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
  min-height: 100vh;
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
  height: 100%;
  grid-column: 1 / span 6;
  grid-row: 1 / span 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors.lightMediumGray};
  padding-top: 20px;
`
