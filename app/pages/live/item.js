import React, {Component} from 'react'
import apiFetch from '../../utils/apiFetch'
import ItemPage from '../../ui/ItemPage'

export default class LifeItem extends Component {

  static getInitialProps = async (context) => {
    try {
      const {itemId} = context.query
      const {item} = await apiFetch(`{
        item (id: "${itemId}") {
          id
          miaId
          title
        }
      }`)


      return {
        item
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      // props,
      props: {
        item
      },

    } = this
    return (
      <ItemPage
        item={item}
      />
    )
  }
}
