import React, {Component} from 'react'
import {SideMenu, MenuItem} from '../../ui/menus'
import Drawer from '../../ui/drawer'
import {logout} from '../../auth'
import {Button} from '../../ui/buttons'
import PropTypes from 'prop-types'

export default class DrawerComponent extends Component {

  static displayName = "DrawerComponent"

  static propTypes = {
    orgSub: PropTypes.string.isRequired,
    userId: PropTypes.string,
    data: PropTypes.object
  }

  render() {
    if (
      this.props.data.loading ||
      !this.props.data.user
    ) {
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
              pathname: '/lume',
              query: {
                orgSub
              }
            }}
            as={`/${orgSub}`}
          >
            Live View
          </MenuItem>
          <MenuItem
            href={{
              pathname: '/cms/org',
              query: {
                orgSub
              }
            }}
            as={`/${orgSub}/cms`}
          >
            Home
          </MenuItem>
          <MenuItem
            href={{
              pathname: '/cms/org/settings',
              query: {
                orgSub
              }
            }}
            as={`/${orgSub}/cms/settings`}
          >
            Settings
          </MenuItem>

          <Button
            onClick={logout}
            color={"red"}
          >
            Logout
          </Button>
        </SideMenu>
      </Drawer>
    )
  }
}
