import React, {Component} from 'react'
import ItemDrawer from './ItemDrawer'
import LeafletViewer from './LeafletViewer'
import {Container, ImgContainer} from './styled'

export default class Item extends Component {
  render() {
    const {
      props,
      props: {
        groupTitle,
        item,
        item: {
          id
        },
        tab
      }
    } = this
    return (
      <Container>
        <ItemDrawer
          {...props}
        />
        <ImgContainer>
          <LeafletViewer
            item={item}
            tab={tab}
          />
          {/* <img
            src={`https://1.api.artsmia.org/${id}.jpg`}
          /> */}
        </ImgContainer>
      </Container>
    )
  }
}
