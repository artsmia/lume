import React, {Component} from 'react'
import styled from 'styled-components'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import Tombstone from './Tombstone'
import Zoomer from '../../shared/Zoomer'
import ContentDisplaySwitcher from '../../contents/DisplaySwitcher'
import {Button} from '../../ui/buttons'
import Icon from '../../ui/icons'
import router from 'next/router'

export default class OriginalTemplate extends Component {

  state = {
    selectedTab: "about",
    selectedContent: {}
  }

  constructor(props){
    super(props)
    this.state = {
      ...this.state,
      selectedContent: props.story.contents.find(content => content.type === "obj") || props.story.contents[0],
    }
  }


  render() {

    const {
      state: {
        selectedTab,
        selectedContent
      },
      props: {
        story
      },
      handleContentSelection,
      createMoreGeometry
    } = this

    let objContent = story.contents.find(content => content.type === 'obj')

    let firstDetailContent = story.contents.find(content => content.type === 'detail')


    let firstContent = objContent || story.contents[0]

    let otherContents = story.contents.slice().filter(content => content.id !== firstContent.id)

    let obj = false

    if (objContent) {
      if (objContent.obj){
        obj = objContent.obj
      }
    }

    return (
      <Container>
        <SideContainer>
          <HomeButton
            onClick={()=>router.back()}
          >
            <Icon
              icon={"arrow-left-bold"}
              fill={"white"}
            />
          </HomeButton>
          {(obj) ? (
            <Tombstone
              obj={obj}
            />
          ): null}

          <TabContainer
            selectedTab={selectedTab}
          >
            <TabHeader>
              <Tab
                name={"about"}
                onClick={ () => this.setState({
                  selectedTab: "about",
                  selectedContent: objContent
                })}
              >
                About
              </Tab>
              <Tab
                name={"details"}
                onClick={()=>this.setState({
                  selectedTab: "details",
                  selectedContent: {
                    type: "all",
                  }
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
            <TabBody
              name={"about"}
            >
              <AboutText
                dangerouslySetInnerHTML={{
                  __html: objContent ? objContent.description : "",
                }}
              />
            </TabBody>
            <TabBody
              name={"details"}
            >
              {otherContents.map( (content) => (
                <Content
                  key={content.id}
                  onClick={()=>{handleContentSelection(content)}}
                >
                  <ContentHeader>
                    <Index>{content.index}</Index>
                    {content.title}
                  </ContentHeader>
                  <ContentBody
                    selected={(selectedContent.id === content.id)}
                    dangerouslySetInnerHTML={{__html:content.description}}
                  />
                </Content>
              ))}
            </TabBody>
            <TabBody
              name={"more"}
            >
              more
            </TabBody>
          </TabContainer>
        </SideContainer>
        <FeatureContainer>
          {(selectedContent.type === "all") ? (
            <Zoomer
              imageId={firstDetailContent.image0.id}
              moreGeometry={createMoreGeometry()}
              onContentSelection={handleContentSelection}
            />
          ): null}
          {(selectedContent.type === "detail") ? (
            <Zoomer
              imageId={selectedContent.image0.id}
              geometry={selectedContent.geometry}
              moreGeometry={createMoreGeometry()}
              onContentSelection={handleContentSelection}
            />
          ): null}
          {(selectedContent.type !== "detail") ? (
            <ContentDisplaySwitcher
              content={selectedContent}
            />
          ): null}
        </FeatureContainer>
      </Container>
    )
  }

  createMoreGeometry = () => {

    const {
      state: {
        selectedContent
      },
      props: {
        story
      }
    } = this

    if (
      selectedContent.type === "detail"
    ) {
      let more = story.contents.slice().filter(content => {
        if (content.type === "detail") {
          if (content.image0.id === selectedContent.image0.id) {
            return true
          }
        }
        return false
      })
      return more
    }
    if (
      selectedContent.type === "all"
    ) {
      let firstDetailContent = story.contents.find(content => content.type === 'detail')
      let more = story.contents.slice().filter(content => {
        if (content.type === "detail") {
          if (content.image0.id === firstDetailContent.image0.id) {
            return true
          }
        }
        return false
      })
      return more
    }
  }

  handleContentSelection = (content) => {
    this.setState({
      selectedContent: content
    })
  }


}

const ContentBody = styled.div`
  height: ${({selected}) => selected ? "auto" : 0};
  visibility: ${({selected}) => selected ? "visible" : "hidden"};
  opacity: ${({selected}) => selected ? "1" : "0"};
  width: 100%;
  transition: all .2s ease;
  overflow-y: hidden;
`


const ContentHeader = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  width: 100%;
  height: 60px;
`

const Index = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: black;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  margin-right: 15px;
  font-size: 24px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: flex-start;
  margin: 10px;
`

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
  background-color: lightgrey;
`

const AboutText = styled.div`
  margin: 15px;
`

const HomeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: black;
  cursor: pointer;
`
