import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Button} from '../../ui/buttons'
import Router from 'next/router'


export default class ItemSettingsEditor extends Component {

  static displayName = "ItemSettingsEditor"

  static propTypes = {
    itemId: PropTypes.string.isRequired,
    data: PropTypes.object,
    editOrCreateItem: PropTypes.func.isRequired
  }

  state = {

  }

  render () {
    if (this.props.data.loading) return null

    const {
      deleteItem
    } = this

    return (
      <div>
        <Button
          color={"red"}
          onClick={deleteItem}
        >
          Delete Item
        </Button>
      </div>
    )
  }

  deleteItem = async () => {
    try {

      const {
        props: {
          deleteItem,
          itemId,
        }
      } = this

      let {
        orgSub
      } = Router.router.query

      await deleteItem({
        variables: {
          itemId
        }
      })


      Router.push({
        pathname: '/cms/browse/items',
        query: {
          orgSub,
        }
      }, `/${orgSub}/cms/items`)


    } catch (ex) {
      console.error(ex)
    }
  }

}
