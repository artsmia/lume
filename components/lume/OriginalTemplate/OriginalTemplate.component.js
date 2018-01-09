import React, {Component} from 'react'
import styled from 'styled-components'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import Tombstone from './Tombstone'
import Zoomer from '../../shared/Zoomer'

export default class OriginalTemplate extends Component {

  state = {
    selectedTab: "about",
    selectedContent: {}
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

    let otherContents = story.contents.slice().filter(content => content.id !== objContent.id)

    return (
      <Container>
        <SideContainer>
          {(objContent) ? (
            <Tombstone
              obj={objContent.obj}
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
                  selectedContent: {}
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
          {(selectedContent.type === "detail") ? (
            <Zoomer
              imageId={selectedContent.image0.id}
              geometry={selectedContent.geometry}
              moreGeometry={createMoreGeometry()}
              onContentSelection={handleContentSelection}
            />
          ): null}
          {}
        </FeatureContainer>
      </Container>
    )
  }

  createMoreGeometry = () => {
    if (
      this.state.selectedContent.type === "detail" &&
      this.props.story
    ) {
      let more = this.props.story.contents.slice().filter(content => {
        if (content.type === "detail") {
          if (content.image0.id === this.state.selectedContent.image0.id) {
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

  componentWillReceiveProps(nextProps){
    if (nextProps.story){
      this.setState({selectedContent: nextProps.story.contents.find(content => content.type === "obj")})
    }
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
`

const AboutText = styled.div`
  margin: 15px;
`
