import React, {Component} from 'react'
import apiFetch from '../utils/apiFetch'
import ItemThumbList from '../ui/ItemThumbList'


export default class IndexPage extends Component {

  static getInitialProps = async (context) => {
    try {
      const {allItems: items} = await apiFetch(`{
        allItems {
          id
          miaId
          title
        }
      }`)


      return {
        items
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      props
    } = this
    return (
      <div>
        <ItemThumbList
          {...props}
        />
      </div>
    )
  }
}
