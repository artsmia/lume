import React, {Component} from 'react'
import ItemThumb from './ItemThumb'
import styled from 'styled-components'

class ItemList extends Component {

  static displayName = "ItemList"

  render() {
    const {itemList} = this
    return (
      <List>
        {itemList()}
      </List>
    )
  }

  itemList = () => {
    const {items, groupTitle} = this.props
    const itemIds = Object.keys(items)
    return itemIds.map( (id) => {
      return (
        <ItemThumb
          item={items[id]}
          key={id}
          groupTitle={groupTitle}
        />
      )
    })
  }


}

const List = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
`


export default ItemList
