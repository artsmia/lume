import React, {Component} from 'react'
import AppTemplate from '../AppTemplate/Template'
import {ItemsContainer, SideContainer} from '../AppTemplate/Template'
import {H2, H3} from '../../ui/h'
import {Button} from '../../ui/buttons'
import {Link} from '../../ui/links'
import {Column} from '../../ui/layout'
import {AppSearchImage} from '../../ui/images'
import {s3Url} from '../../config'
import {Search} from '../../ui/search'
import AppItemList from '../AppItemList'
export default class AppHome extends Component {

  state = {
    search: ""
  }

  render() {

    if (this.props.data.loading) return null

    const {
      props,
      props: {
        orgSub,
      },
      state: {
        search
      },
      handleChange
    } = this
    return (
      <AppTemplate
        {...props}
      >
        <SideContainer>
          <H2>Search Art Stories</H2>
          <Search
            name={"search"}
            value={search}
            onChange={handleChange}
          />
        </SideContainer>
        <AppItemList
          orgSub={orgSub}
          search={search}
        />
        {/* <ItemsContainer>
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
        </ItemsContainer> */}
      </AppTemplate>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

}
