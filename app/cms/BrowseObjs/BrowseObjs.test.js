import React from 'react'
import { shallow} from 'enzyme'
import BrowseObjs from './BrowseObjs'

describe("BrowseObjs", ()=> {

  let props

  let browseObjs

  let stubProps = {
    orgSub: "",
    data: {
      objs: []
    },
    newObj: ()=>{}
  }


  const shallowBrowseObjs = () => {
    browseObjs = shallow(
      <BrowseObjs
        {...props}
      />
    )
  }

  beforeEach( () => {
    browseObjs = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowBrowseObjs()

  })


})
