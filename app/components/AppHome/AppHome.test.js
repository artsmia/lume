import React from 'react'
import { shallow} from 'enzyme'
import AppHome from './AppHome'

describe("AppHome", ()=> {

  let props

  let appHome

  let stubProps = {
    orgSub: ""
  }


  const shallowAppHome = () => {
    appHome = shallow(
      <AppHome
        {...props}
      />
    )
  }

  beforeEach( () => {
    appHome = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowAppHome()

  })


})
