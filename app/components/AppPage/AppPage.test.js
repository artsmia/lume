import React from 'react'
import { shallow} from 'enzyme'
import AppPage from './AppPage'

describe("AppPage", ()=> {

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


  const shallowAppPage = () => {
    appPage = shallow(
      <AppPage
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

    shallowAppPage()

  })


})
