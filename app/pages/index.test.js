import React from 'react'
import { mount} from 'enzyme'
import AppRoot from './index.js'

describe("AppRoot page", ()=> {

  let appRoot

  let props = {
    serverState: {}
  }

  const mountAppRoot = () => {
    appRoot = mount(
      <AppRoot
        {...props}
      />
    )
  }

  beforeEach( () => {
    appRoot = undefined
  })


  it("mounts without errors", () => {

    mountAppRoot()

  })


})
