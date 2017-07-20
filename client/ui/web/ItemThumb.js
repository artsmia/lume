import React, {Component} from 'react'
import styled from 'styled-components'
import Link from 'next/link'

class ItemThumb extends Component {

  static displayName = "ItemThumb"


  render() {
    const {
      item,
      item: {
        id,
        title
      }
    } = this.props
    return (
      <Link
        href={{
          query: {
            itemId: id,
            groupTitle: 'main'
          }
        }}
        as={`/main/${id}`}
      >
        <Thumb
          src={`https://1.api.artsmia.org/${id}.jpg`}
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

export default ItemThumb
