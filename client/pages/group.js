import React, {Component} from 'react'
import ItemList from '../ui/web/ItemList'
import oldData from '../oldData'


class Group extends Component {


  static getInitialProps = async () => {
    try {

      const itemIds = Object.keys(oldData.objects)
      const items = itemIds.map((id)=>{
        return oldData.objects[id]
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
