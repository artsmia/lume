import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import Item from '../ui/web/Item'

class ItemPage extends Component {

  static getInitialProps = async (context) => {
    try {

      const {itemId, groupTitle} = context.query

      const response = await fetch('https://new.artsmia.org/crashpad/')

      const data = await response.json()

      const item = data.objects[itemId]

      return {
        item,
        groupTitle
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      item,
      groupTitle
    } = this.props
    return (
      <Item
        item={item}
        groupTitle={groupTitle}
      />
    )
  }
}

export default ItemPage
