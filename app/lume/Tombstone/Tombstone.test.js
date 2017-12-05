import React from 'react'
import { mount } from 'enzyme'
import {ThemeProvider} from 'styled-components'
import {Loading} from '../../ui/spinner'
import Tombstone from './Tombstone'
import theme from '../../ui/theme'

describe("Tombstone", () => {
  let props

  let appTombstone

  const mountTombstone = () => {
    appTombstone = mount(
      <ThemeProvider
        theme={theme}
      >
        <Tombstone
          {...props}
        />
      </ThemeProvider>
    )

    appTombstone = appTombstone.find("Tombstone")
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

    mountTombstone()

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
  //   mountTombstone()
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
