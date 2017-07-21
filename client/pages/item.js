import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'

class Item extends Component {

  static getInitialProps = async (context) => {
    try {

      const {itemId} = context.query

      const response = await fetch('https://new.artsmia.org/crashpad/')

      const data = await response.json()

      const item = data.objects[itemId]

      return {
        item
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {item} = this.props
    return (
      <div>
        <h2>{item.title}</h2>
      </div>
    )
  }
}

export default Item
