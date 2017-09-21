import React from 'react'
import { shallow} from 'enzyme'
import AppDetail from './AppDetail'

describe("AppDetail", ()=> {

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


  const shallowAppDetail = () => {
    appDetail = shallow(
      <AppDetail
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

    shallowAppDetail()

  })


})
