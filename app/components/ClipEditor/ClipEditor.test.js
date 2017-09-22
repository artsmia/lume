import React from 'react'
import { shallow} from 'enzyme'
import ClipEditor from './ClipEditor'

describe("ClipEditor", ()=> {

  let props

  let clipEditor

  let stubProps = {
    orgSub: "",
    data: {
      clip: {
        additionalImages: [],
        detail: {
        },
        geometry: {}
      }
    },
    editOrCreateClip: ()=>{},
    clipId: ""
  }


  const shallowClipEditor = () => {
    clipEditor = shallow(
      <ClipEditor
        {...props}
      />
    )
  }

  beforeEach( () => {
    clipEditor = undefined
    props = undefined
  })


  it("shallows without errors", () => {

    props = stubProps

    shallowClipEditor()

  })


})
