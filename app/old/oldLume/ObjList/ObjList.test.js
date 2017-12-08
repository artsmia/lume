import React from 'react'
import { shallow} from 'enzyme'
import ObjList from './ObjList'

describe("ObjList", ()=> {

  let props

  let appObjList

  let stubProps = {
    search: "",
    data: {
      objs: []
    }
  }


  const shallowObjList = () => {
    appObjList = shallow(
      <ObjList
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

    shallowObjList()

  })


})
