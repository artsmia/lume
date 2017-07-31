import React, {Component} from 'react'
import ItemList from '../ui/ItemList'
import {getGroups} from '../utils'

export default class Group extends Component {

  state = {
    items: {}
  }

  static getInitialProps = async (context) => {
    try {

      const {groupTitle, groupId} = context.query

      // const response = await fetch('https://new.artsmia.org/crashpad/')
      //
      // const data = await response.json()
      //
      // const itemIds = Object.keys(data.objects)
      // const items = itemIds.map((id)=>{
      //   return data.objects[id]
      // })
      return {
        // items,
        groupTitle,
        groupId
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      props: {
        groupTitle,
      },
      state: {
        items
      }
    } = this

    return (
      <div>
        <ItemList
          items={items}
          groupTitle={groupTitle}
        />
      </div>
    )
  }

  componentDidMount(){
    try {
      this.getGroups()
    } catch (e) {
      console.error("componentDidMount error")
    }
  }

  getGroups = async () => {
    try {
      const {groupId, groupTitle} = this.props
      const groups = await getGroups()
      console.log("groupId", groupId )
      if (groupId) {
        const {items} = groups[groupId]
        this.setState({items})
      } else if (!groupId && groupTitle){
        const groupIds = Object.keys(groups)
        const groupId = groupIds.find( (id)=> {
          return groups[id].title === groupTitle
        })
        const {items} = groups[groupId]
        this.setState({items})
      }
    } catch (e) {
      console.error("there was an error", e)

    }
  }
}
