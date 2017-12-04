import React from 'react'
import { mount} from 'enzyme'
import AppRoot from './index.js'

describe("AppRoot page", ()=> {

  let appRoot

  const mountAppRoot = () => {
    appRoot = mount(
      <AppRoot/>
    )
  }

  beforeEach( () => {
    appRoot = undefined
  })


  it("mounts without errors", () => {

    mountAppRoot()

  })


})
