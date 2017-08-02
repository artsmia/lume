import React, {Component} from 'react'
import apiFetch from '../../utils/apiFetch'
import CmsPage from '../../ui/CmsPage'

export default class CmsIndex extends Component {

  static getInitialProps = async (context) => {
    try {
      // const {} = context.query
      const {allItems: items} = await apiFetch(`{
        allItems {
          id
          title
        }
      }`)


      return {
        items,
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
      <CmsPage
        {...props}
      />
    )
  }
}
