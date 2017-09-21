import React from 'react'
import { shallow} from 'enzyme'
import AppItemList from './AppItemList'

describe("AppItemList", ()=> {

  let props

  let appItemList

  let stubProps = {
    search: "",
    data: {
      items: []
    }
  }


  const shallowAppItemList = () => {
    appItemList = shallow(
      <AppItemList
        {...props}
      />
    )
  }

  beforeEach( () => {
    appItemList = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowAppItemList()

  })


})
