import React from 'react'
import { mount } from 'enzyme'
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
      objId: undefined,
      data: undefined
    }
  })


  it("mounts without errors", () => {

    props = {
      data: {
        obj: {
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
      objId: "123"
    }

    mountAppTombstone()

  })
  // 
  // it("renders <Loading/> when props.data.loading is true", () => {
  //   props = {
  //     data: {
  //       loading: true,
  //     },
  //     objId: "123"
  //   }
  //
  //   mountAppTombstone()
  //
  //   expect(
  //     appTombstone
  //   ).toContainReact(
  //     <Loading/>
  //   )
  //
  // })
  //



})
