import React from 'react'
import { shallow} from 'enzyme'
import CmsHome from './CmsHome.component'

describe("CmsHome component", ()=> {

  let props

  let cmsHome

  let stubProps = {
    userId: "123",
    subdomain: "abc"
  }


  const shallowComponent = () => {
    cmsHome = shallow(
      <CmsHome
        {...props}
      />
    )
  }

  beforeEach( () => {
    cmsHome = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowComponent()

  })


})
