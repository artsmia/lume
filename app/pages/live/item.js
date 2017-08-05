import React, {Component} from 'react'
import apiFetch from '../../utils/apiFetch'
import ItemPage from '../../components/ItemPage'

export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      const {itemId, tab} = context.query
      const {item} = await apiFetch(`{
        item (id: "${itemId}") {
          id
          miaId
          title
          text
          detail {
            id
            clips {
              id
              title
              description
            }
          }
          relatedBooks {
            id
            title
          }
        }
      }`)


      return {
        item,
        tab
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
      <ItemPage
        {...props}
      />
    )
  }
}
