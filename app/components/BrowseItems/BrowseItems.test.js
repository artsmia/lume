import React from 'react'
import { shallow} from 'enzyme'
import BrowseItems from './BrowseItems'

describe("BrowseItems", ()=> {

  let props

  let browseItems

  let stubProps = {
    orgSub: "",
    data: {
      items: []
    },
    newItem: ()=>{}
  }


  const shallowBrowseItems = () => {
    browseItems = shallow(
      <BrowseItems
        {...props}
      />
    )
  }

  beforeEach( () => {
    browseItems = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowBrowseItems()

  })


})
