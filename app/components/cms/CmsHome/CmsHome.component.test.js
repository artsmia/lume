import React from 'react'
import { shallow } from 'enzyme'
import CmsHome from './CmsHome.component'

describe('CmsHome component', () => {
  let props

  let component

  let stubProps = {
    organization: {
      name: 'mia'
    },
    user: {
      id: '123abc',
      organizations: [
        {
          subdomain: 'mia',
          role: 'admin'
        }
      ]
    },
    router: {
      query: {
        subdomain: 'mia'
      }
    },
    addTips() {
      console.log('addTips')
    }
  }

  const shallowComponent = () => {
    component = shallow(<CmsHome {...props} />)
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
