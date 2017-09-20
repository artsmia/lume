import React from 'react'
import { mount } from 'enzyme'
import {toContainReact} from 'jest-enzyme'
import {ThemeProvider} from 'styled-components'
import {Loading} from '../../ui/spinner'
import AppTombstone from './AppTombstone'
import theme from '../../ui/theme'


describe("AppTombstone", () => {
  let props

  let appTombstone

  const mountAppTombstone = () => {
    appTombstone = mount(
      <ThemeProvider
        theme={theme}
      >
        <AppTombstone
          {...props}
        />
      </ThemeProvider>
    )

    appTombstone = appTombstone.find("AppTombstone")
  }

  beforeEach(() => {
    appTombstone = undefined
    props = {
      itemId: undefined,
      data: undefined
    }
  })


  it("mounts without errors", () => {

    props = {
      data: {
        item: {
          accessionNumber: "",
          attribution: "",
          creditLine: "",
          culture: "",
          currentLocation: "",
          date: "",
          dimensions: "",
          medium: "",
          title: "",
        }
      },
      itemId: "123"
    }

    mountAppTombstone()

  })

  it("renders <Loading/> when props.data.loading is true", () => {
    props = {
      data: {
        loading: true,
      },
      itemId: "123"
    }

    mountAppTombstone()

    expect(
      appTombstone
    ).toContainReact(
      <Loading/>
    )

  })




})
