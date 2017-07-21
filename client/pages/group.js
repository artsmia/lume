import React, {Component} from 'react'
import ItemList from '../ui/web/ItemList'
import fetch from 'isomorphic-unfetch'

class Group extends Component {


  static getInitialProps = async () => {
    try {

      const response = await fetch('https://new.artsmia.org/crashpad/')

      const data = await response.json()

      const itemIds = Object.keys(data.objects)
      const items = itemIds.map((id)=>{
        return data.objects[id]
      })
      return {
        items
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {items} = this.props
    return (
      <div>
        <ItemList
          items={items}
        />
      </div>
    )
  }
}

export default Group
