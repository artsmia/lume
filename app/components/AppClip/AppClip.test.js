import React from 'react'
import { shallow} from 'enzyme'
import AppClip from './AppClip'

describe("AppClip", ()=> {

  let props

  let appClip

  const shallowAppClip = () => {
    let appClip = shallow(
      <AppClip
        {...props}
      />
    )
  }

  beforeEach( () => {
    appClip = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = {
      data: {
        clip: {
          id: "",
          title: "",
          description: ""
        }
      },
      clipId: ""
    }

    shallowAppClip()

  })


})
