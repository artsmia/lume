import React from "react"
import { mount, shallow} from "enzyme"
import {toContainReact} from 'jest-enzyme'
import {Loading} from '../../ui/spinner'
import AppItem from "./AppItem"
import {ThemeProvider} from 'styled-components'
import theme from '../../ui/theme'
import withData from '../../apollo/withData'

describe("AppItem", () => {
  let props

  let appItem


  const mountAppItem = () => {
    let ApolloAppItem = withData(AppItem)
    appItem = mount(
      <ThemeProvider
        theme={theme}
      >
        <ApolloAppItem
          {...props}
          serverState={{}}
        />
      </ThemeProvider>
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
        }
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
      itemId: "asdf"
    }

    mountAppItem()

    expect(
      appItem
    ).toContainReact(
      <Loading/>
    )

  })




})
