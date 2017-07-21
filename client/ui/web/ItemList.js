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
    return items.map( (item) => {
      return (
        <ItemThumb
          item={item}
          key={item.id}
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
