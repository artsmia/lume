import React, {Component} from 'react'
import styled from 'styled-components'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import Tombstone from './Tombstone'

export default class OriginalTemplate extends Component {

  state = {
    selectedTab: "About"
  }

  render() {

    const {
      state: {
        selectedTab
      },
      props: {
        story
      }
    } = this

    let {obj} = story.contents.find(content => content.type === 'obj')

    return (
      <Container>
        <SideContainer>
          <Tombstone
            obj={obj}
          />
          <TabContainer
            selectedTab={selectedTab}
          >
            <TabHeader>
              <Tab
                name={"about"}
                onClick={ () => this.setState({
                  selectedTab: "about",
                })}
              >
                About
              </Tab>
              <Tab
                name={"details"}
                onClick={()=>this.setState({
                  selectedTab: "details",

                })}
              >
                Details
              </Tab>
              <Tab
                name={"more"}
                onClick={()=>this.setState({
                  selectedTab: "more",
                })}
              >
                More
              </Tab>
            </TabHeader>
          </TabContainer>
        </SideContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  box-sizing: border-box;
  height: 100vh;
`

const SideContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`

const FeatureContainer = styled.div`
  width: 70%;
  display: flex;
`
