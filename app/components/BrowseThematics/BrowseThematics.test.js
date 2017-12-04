import React from 'react'
import { shallow} from 'enzyme'
import BrowseThematics from './BrowseThematics'

describe("BrowseThematics", ()=> {

  let props

  let browseThematics

  let stubProps = {
    orgSub: "",
    data: {
      thematics: []
    },
    newThematic: () => {}
  }


  const shallowBrowseThematics = () => {
    browseThematics = shallow(
      <BrowseThematics
        {...props}
      />
    )
  }

  beforeEach( () => {
    browseThematics = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowBrowseThematics()

  })


})
