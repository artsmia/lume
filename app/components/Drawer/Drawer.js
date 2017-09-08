import React, {Component} from 'react'
import styled from 'styled-components'
import {SideMenu, MenuItem} from '../../ui/menus'
import Drawer from '../../ui/drawer'

export default class Template extends Component {

  static defaultProps = {
    drawer: true,
    data: {
      user: {
        email: ""
      }
    },
    orgSub: ""
  }

  render() {
    if (this.props.data.loading) {
      return null
    }
    const {
      props: {
        data: {
          user: {
            email
          }
        },
        orgSub,
      },
    } = this
    return (
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
    )
  }
}
