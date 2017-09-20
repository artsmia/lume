import React from 'react'
import { shallow} from 'enzyme'
import AppBook from './AppBook'

describe("AppBook", ()=> {

  let props

  let appBook

  let stubProps = {
    bookId: "1234",
    data: {
      book: {
        id: "1234",
        title: "A Book",
        pages: [
          {
            id: "0000",
            index: 1
          }
        ]
      }
    }
  }


  const shallowAppBook = () => {
    let appBook = shallow(
      <AppBook
        {...props}
      />
    )
  }

  beforeEach( () => {
    appBook = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = {
      data: {
        book: {
          id: "",
          title: "",
          pages: [
            {
              index: 0,
              id: ""
            }
          ]
        }
      },
      bookId: ""
    }

    shallowAppBook()

  })


})
