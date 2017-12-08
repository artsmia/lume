import React from 'react'
import { shallow} from 'enzyme'
import DetailEditor from './DetailEditor'

describe("DetailEditor", ()=> {

  let props

  let detailEditor

  let stubProps = {
    subdomain: "",
    data: {
      detail: {
        additionalImages: []
      }
    },
    editOrCreateDetail: ()=>{},
    detailId: "",
    editClip: () => {}
  }


  const shallowDetailEditor = () => {
    detailEditor = shallow(
      <DetailEditor
        {...props}
      />
    )
  }

  beforeEach( () => {
    detailEditor = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowDetailEditor()

  })


})
