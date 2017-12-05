import React from 'react'
import { shallow} from 'enzyme'
import Drawer from './Drawer'

describe("Drawer", ()=> {

  let props

  let drawer

  let stubProps = {
    orgSub: "",
    data: {
      user: {}
    },
    orgSub: ""
  }


  const shallowDrawer = () => {
    drawer = shallow(
      <Drawer
        {...props}
      />
    )
  }

  beforeEach( () => {
    drawer = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowDrawer()

  })


})
