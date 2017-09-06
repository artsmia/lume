import React, {Component} from 'react'
import {ItemsContainer} from '../AppTemplate/Template'
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
