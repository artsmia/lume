import React from 'react'
import { shallow} from 'enzyme'
import BrowseBooks from './BrowseBooks'

describe("BrowseBooks", ()=> {

  let props

  let browseBooks

  let stubProps = {
    orgSub: "",
    data: {
      books: []
    },
    newBook: () => {}
  }


  const shallowBrowseBooks = () => {
    browseBooks = shallow(
      <BrowseBooks
        {...props}
      />
    )
  }

  beforeEach( () => {
    browseBooks = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowBrowseBooks()

  })


})
