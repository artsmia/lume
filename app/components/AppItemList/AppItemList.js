import React, {Component} from 'react'
import styled from 'styled-components'
import {s3Url} from '../../config'
import Link from 'next/link'
import Image from '../Image'

export default class extends Component {
  render(){

    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          items
        },
        orgSub
      }
    } = this
    return (
      <ItemsContainer>
        {items.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: 'app/item',
              query: {
                orgSub: orgSub,
                itemId: item.id
              }
            }}
            as={`/${orgSub}/item/${item.id}`}
          >
            <Image
              imageId={item.mainImage.id}
              height={"200px"}
              quality={"m"}
            />
          </Link>
        ))}
      </ItemsContainer>
    )
  }
}

const ItemsContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
`
