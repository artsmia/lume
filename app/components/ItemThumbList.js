import React, {Component} from 'react'
import styled from 'styled-components'
import ItemThumb from './ItemThumb'

export default class ItemThumbList extends Component {

  static displayName = "ItemThumbList"



  render() {
    const {
      list
    } = this
    return (
      <Container>
        {list}
      </Container>
    )
  }

  get list() {
    const {
      items
    } = this.props
    return items.map( item => (
      <ItemThumb
        key={item.id}
        item={item}
      />
    ))
  }



}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`
