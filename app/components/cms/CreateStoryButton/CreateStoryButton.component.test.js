import React from 'react'
import { shallow} from 'enzyme'
import CreateStoryButton from './CreateStoryButton.component'

describe("CreateStoryButton component", ()=> {

  let props

  let component

  let stubProps = {
    userId: "123abc",
  }


  const shallowComponent = () => {
    component = shallow(
      <CreateStoryButton
        {...props}
      />
    )
  }

  beforeEach( () => {
    component = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowComponent()

    expect(component).toHaveLength(1)

  })


})
