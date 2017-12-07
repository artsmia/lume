import React from 'react'
import { shallow} from 'enzyme'
import Home from './Home'

describe("Home", ()=> {

  let props

  let appHome

  let stubProps = {
    orgSub: ""
  }


  const shallowHome = () => {
    appHome = shallow(
      <Home
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

    shallowHome()

  })


})
