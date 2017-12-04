import React from 'react'
import { shallow} from 'enzyme'
import AppThematic from './AppThematic'

describe("AppThematic", ()=> {

  let props

  let appThematic

  let stubProps = {
    thematicId: "1234",
    data: {
      thematic: {
        id: "1234",
        title: "A Thematic",
        pages: [
          {
            id: "0000",
            index: 1
          }
        ]
      }
    }
  }


  const shallowAppThematic = () => {
    let appThematic = shallow(
      <AppThematic
        {...props}
      />
    )
  }

  beforeEach( () => {
    appThematic = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = {
      data: {
        thematic: {
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
      thematicId: ""
    }

    shallowAppThematic()

  })


})
