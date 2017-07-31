import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import Item from '../ui/Item'

class ItemPage extends Component {

  static getInitialProps = async (context) => {
    try {

      const {itemId, groupTitle, tab} = context.query

      const response = await fetch('https://new.artsmia.org/crashpad/')

      const data = await response.json()

      const item = data.objects[itemId]

      return {
        item,
        groupTitle,
        tab,
        data
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      item,
      groupTitle,
      tab,
      data
    } = this.props
    return (
      <Item
        item={item}
        groupTitle={groupTitle}
        tab={tab}
        data={data}
      />
    )
  }
}

export default ItemPage
