import React from "react"
import { mount } from "enzyme"
import {toContainReact} from 'jest-enzyme'
import {Loading} from '../../ui/spinner'
import AppItem from "./AppItem"
import {ThemeProvider} from 'styled-components'
import theme from '../../ui/theme'


describe("AppItem", () => {
  let props

  let appItem

  const mountAppItem = () => {
    appItem = mount(
      <ThemeProvider
        theme={theme}
      >
        <AppItem
          {...props}
        />
      </ThemeProvider>
    )

    appItem = appItem.find("AppItem")
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
          title: "",
          attribution: "",
          mainImage: "",
          text: "",
          details: [],
          relatedBooks: []
        }
      },
      orgSub: ""
    }

    mountAppItem()

  })

  it("renders <Loading/> when props.data.loading is true", () => {
    props.data = {
      loading: true
    }

    mountAppItem()

    expect(
      appItem
    ).toContainReact(
      <Loading/>
    )

  })




})
