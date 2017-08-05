import React, {Component} from 'react'
import apiFetch from '../../utils/apiFetch'
import MiaUI from '../../ui'
import CmsTemplate from '../../ui/cms/Template'


export default class extends Component {

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
      <MiaUI>
        <CmsTemplate>
          <h2>Hello</h2>
        </CmsTemplate>
      </MiaUI>
    )
  }
}
