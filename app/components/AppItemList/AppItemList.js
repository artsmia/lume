import React, {Component} from 'react'
import {ItemsContainer} from '../AppTemplate/Template'
import {AppSearchImage} from '../../ui/images'
import {s3Url} from '../../config'

export default class extends Component {
  render(){

    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          organization,
          items
        }
      }
    } = this

    return (
      <ItemsContainer>
        {items.map((item, index) => (
          <AppSearchImage
            key={index}
            src={`${s3Url}/${organization.id}/${item.mainImage.id}/m`}
            href={{
              pathname: 'app/item',
              query: {
                orgSub: organization.subdomain,
                itemId: item.id
              }
            }}
            as={`/${organization.subdomain}/item/${item.id}`}
          />
        ))}
      </ItemsContainer>
    )
  }
}
