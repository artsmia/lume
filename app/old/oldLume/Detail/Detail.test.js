import React from 'react'
import { shallow} from 'enzyme'
import Detail from './Detail'

describe("Detail", ()=> {

  let props

  let appDetail

  let stubProps = {
    detailId: "",
    data: {
      detail: {
        id: "",
        title: "",
        image:"",
        clips: []
      }
    }
  }


  const shallowDetail = () => {
    appDetail = shallow(
      <Detail
        {...props}
      />
    )
  }

  beforeEach( () => {
    appDetail = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowDetail()

  })


})
