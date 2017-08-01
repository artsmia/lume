import React, {Component} from 'react'
import styled from 'styled-components'
import Link from './Link'


export default class ItemThumb extends Component {

  static displayName = "ItemThumb"



  render() {
    const {
      miaId,
      title,
      id
    } = this.props.item
    return (
      <Link
        href={{
          pathname: "/live/item",
          query: {
            itemId: id
          }
        }}
        as={`/${id}`}
      >
        <Thumb
          src={`https://1.api.artsmia.org/${miaId}.jpg`}
          title={title}
          alt={title}
        />
      </Link>
    )
  }


}

const Thumb = styled.img`
  height: 200px;
  width: auto;
`
