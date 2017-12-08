import React from 'react'
import { shallow} from 'enzyme'
import Page from './Page'

describe("Page", ()=> {

  let props

  let appPage

  let stubProps = {
    pageId: "",
    data: {
      page: {
        comparisonImages: []
      }
    }
  }


  const shallowPage = () => {
    appPage = shallow(
      <Page
        {...props}
      />
    )
  }

  beforeEach( () => {
    appPage = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowPage()

  })


})
