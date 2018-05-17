import React from 'react'
import { shallow } from 'enzyme'
import CreateContentButton from './CreateContentButton.component'

describe('CreateContentButton component', () => {
  let props

  let component

  let stubProps = {
    storyId: '123abc',
    type: 'comparison'
  }

  const shallowComponent = () => {
    component = shallow(<CreateContentButton {...props} />)
  }

  beforeEach(() => {
    component = undefined
    props = undefined
  })

  it('shallows without errors', () => {
    props = stubProps

    shallowComponent()

    expect(component).toHaveLength(1)
  })
})
