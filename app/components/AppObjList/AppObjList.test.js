import React from 'react'
import { shallow} from 'enzyme'
import AppObjList from './AppObjList'

describe("AppObjList", ()=> {

  let props

  let appObjList

  let stubProps = {
    search: "",
    data: {
      objs: []
    }
  }


  const shallowAppObjList = () => {
    appObjList = shallow(
      <AppObjList
        {...props}
      />
    )
  }

  beforeEach( () => {
    appObjList = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowAppObjList()

  })


})
