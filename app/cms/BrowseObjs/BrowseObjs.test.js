import React from 'react'
import { shallow, mount} from 'enzyme'
import BrowseObjs from './index'
import withData from '../../apollo'
import {ThemeProvider} from 'styled-components'
import theme from '../../ui/theme'




describe("BrowseObjs", ()=> {

  console.log(jest.setTimeout(10000))


  // let props
  //
  // let BrowseObjs = () => (
  //   <MockedProvider>
  //     <ApolloBrowseObjs/>
  //   </MockedProvider>
  // )
  //
  // let stubProps = {
  //   orgSub: "",
  //   data: {
  //     objs: []
  //   },
  //   newObj: ()=>{}
  // }
  //
  //
  // const shallowBrowseObjs = () => {
  //   browseObjs = shallow(
  //     <BrowseObjs
  //       {...props}
  //     />
  //   )
  // }
  //
  // beforeEach( () => {
  //   browseObjs = undefined
  //   props = undefined
  // })




  it("does this update", done => {

    // const BrowseObjsWithProps = (props) => (
    //   <BrowseObjs
    //     orgSub={"mia"}
    //     {...props}
    //   />
    // )

    //const BrowseObjsWithApollo = withData(BrowseObjs)

    let Browse = (props) => (
      <BrowseObjs
        orgSub={"mia"}
        {...props}
      />
    )

    const BrowseObjsWithApollo = withData(Browse)

    const wrapper = mount(
      <ThemeProvider
        theme={theme}
      >
        <BrowseObjsWithApollo
          serverState={{
            apollo: {
              data: {

              }
            }
          }}
        />
      </ThemeProvider>

    )

    let props = wrapper.props()

    if (props.loading === false) {
      expect(Array.isArray(props.obj)).toBe(true)
      done()
    }


  })


})
