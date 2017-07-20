import React, {Component} from 'react'
import oldData from '../oldData'

class Item extends Component {

  static getInitialProps = async (context) => {
    try {

      const {itemId} = context.query

      const item = oldData.objects[itemId]

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
