import React from 'react'
import { mount, shallow} from 'enzyme'
import {toContainReact} from 'jest-enzyme'
import {Loading} from '../../ui/spinner'
import AppItem from './AppItem'
import setupTests from '../../utils/setupTests'

describe("AppItem", () => {
  let props

  let appItem


  const mountAppItem = () => {
    let PreppedAppItem = setupTests(AppItem)
    appItem = mount(
      <PreppedAppItem
        {...props}
      />
    )

    appItem = appItem.find(AppItem)
  }

  beforeEach(() => {
    appItem = undefined
    props = {
      data: undefined,
      itemId: undefined,
      orgSub: undefined
    }
  })


  it("mounts without errors", () => {

    props = {
      data: {
        item: {
          id: "",
          title: "",
          attribution: "",
          mainImage: "",
          text: "",
          details: [],
          relatedBooks: []
        },
        loading: true
      },
      orgSub: "",
      itemId: "asdf"
    }

    mountAppItem()

  })

  it("renders <Loading/> when props.data.loading is true", () => {
    props = {
      data: {
        loading: true,
        item: {
          id: "asdf"
        }
      },
      itemId: "asdf",
      orgSub: "",
    }

    mountAppItem()

    expect(
      appItem
    ).toContainReact(
      <Loading/>
    )

  })




})
