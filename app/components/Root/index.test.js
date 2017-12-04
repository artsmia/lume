import React from 'react'
import { mount} from 'enzyme'
import Root from './index.js'
import withData from '../../apollo'

const AppRoot = withData(Root)

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
