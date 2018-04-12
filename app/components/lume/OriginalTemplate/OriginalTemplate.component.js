import React, {Component} from 'react'
import styled from 'styled-components'
import {TabContainer, TabHeader, Tab, TabBody} from '../../mia-ui/tabs'
import Tombstone from './Tombstone'
import Zoomer from '../../shared/Zoomer'
import ContentDisplaySwitcher from '../../contents/DisplaySwitcher'
import {Button} from '../../mia-ui/buttons'
import {Icon} from '../../mia-ui/icons'
import router from 'next/router'
import Link from 'next/link'
import Markdown from 'react-markdown'
import AdditionalImages from './AdditionalImages'
import {Flex, Box} from 'grid-styled'
import {Expander} from '../../mia-ui/expanders'
import {H3} from '../../mia-ui/text'

export default class OriginalTemplate extends Component {

  state = {
    selectedTab: "about",
    selectedContent: {
      id: ''
    }
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
        story,
        router: {
          query: {
            subdomain
          }
        },
        organization
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
      <Container
        w={1}
      >
        <SideContainer
          w={1/4}
          flexWrap={'wrap'}
          p={1}
        >
          <Box
            w={1}
          >
            <Button
              onClick={()=>router.back()}
              round
            >
              <Icon
                color={"white"}
                icon={"arrow_back"}
              />
            </Button>
          </Box>


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
                  selectedContent: objContent
                })}
              >
                More
              </Tab>
            </TabHeader>
            <TabBody
              name={"about"}
            >

              <Box
                p={3}
              >
                <Markdown
                  source={objContent ? objContent.description : ""}
                />
              </Box>
            </TabBody>
            <TabBody
              name={"details"}
            >
              {otherContents.map( (content) => (
                <Expander
                  key={content.id}
                  open={(selectedContent.id === content.id)}
                  onRequestOpen={()=>{handleContentSelection(content)}}
                  onRequestClose={()=>{this.setState({
                    selectedContent: {
                      type: 'all'
                    }
                  })}}
                  header={
                    <H3>
                      {content.title}
                    </H3>
                  }
                  icon={
                    <Button
                      round
                    >
                      {content.index}
                    </Button>
                  }
                >
                  <Flex
                    flexWrap={'wrap'}
                  >
                    <Box
                      w={1}
                      p={3}
                    >
                      <Markdown
                        source={content.description}
                      />
                    </Box>

                    {(content.additionalImages.length > 0) ? (
                      <Box
                        w={1}
                        p={3}
                      >
                        <AdditionalImages
                          additionalImages={content.additionalImages}
                          organization={organization}
                        />

                      </Box>
                    ):null}





                  </Flex>

                </Expander>
              ))}
            </TabBody>
            <TabBody
              name={"more"}
            >
              <Flex
                flexWrap={'wrap'}
              >
                {story.relatedStories.map(story => (
                  <Link
                    href={{
                      pathname: '/lume/story',
                      query: {
                        subdomain,
                        storyId: story.id
                      }
                    }}
                    as={`/${subdomain}/${story.id}`}
                    key={story.id}
                  >
                    <RelatedStoryBox
                      w={1}
                      my={2}
                      mx={1}
                      p={2}
                    >
                      {story.title}
                    </RelatedStoryBox>
                  </Link>
                ))}
              </Flex>
            </TabBody>
          </TabContainer>
        </SideContainer>
        <FeatureContainer
          w={[3/4]}
        >
          {this.showFeature(firstDetailContent)}
        </FeatureContainer>
      </Container>
    )
  }

  showFeature = (firstDetailContent) => {

    const {
      selectedContent
    } = this.state

    if (
      selectedContent.type !== 'detail' &&
      selectedContent.type !== 'obj'
    ){
      return (
        <ContentDisplaySwitcher
          content={selectedContent}
        />
      )
    }

    let zoomerProps = {}

    if (
      selectedContent.type === "obj" &&
      selectedContent.obj.primaryImage
    ) {
      Object.assign(zoomerProps, {
        imageId: selectedContent.obj.primaryImage.id,
        onContentSelection: this.handleContentSelection,

      })
    }

    if (
      selectedContent.type === "all" &&
      firstDetailContent.image0
    ) {
      Object.assign(zoomerProps, {
        imageId: firstDetailContent.image0.id,
        moreGeometry: this.createMoreGeometry(),
        onContentSelection: this.handleContentSelection,
      })
    }

    if (
      selectedContent.type === 'detail' &&
      selectedContent.image0
    ) {
      Object.assign(zoomerProps, {
        imageId: selectedContent.image0.id,
        geometry: selectedContent.geometry,
        moreGeometry: this.createMoreGeometry(),
        onContentSelection: this.handleContentSelection,
        zoom: true
      })
    }

    return (
      <Zoomer
        {...zoomerProps}
      />
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

const Container = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
`
const SideContainer = styled(Box)`
  height: 100vh;
  max-height: 100vh;
`
const FeatureContainer = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
`

const RelatedStoryBox = styled(Box)`
  border: 1px solid lightgrey;
  font-size: 20px;
  cursor: pointer;
`

// const RelatedStory = styled.a`
//   display: flex;
//   width: 100%;
//   height: 50px;
//   font-size: 22px;
//   align-items: center;
//   border: 1px solid lightgrey;
//   padding: 5px;
//   cursor: pointer;
//   box-sizing:border-box;
//   margin-top: 5px;
// `
//
// const ContentBody = styled.div`
//   height: ${({selected}) => selected ? "auto" : 0};
//   visibility: ${({selected}) => selected ? "visible" : "hidden"};
//   opacity: ${({selected}) => selected ? "1" : "0"};
//   width: 100%;
//   transition: all .2s ease;
// `
//
//
// const ContentHeader = styled.div`
//   display: flex;
//   flex-direction:row;
//   align-items: center;
//   width: 100%;
//   height: 60px;
// `
//
// const Index = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   background-color: black;
//   height: 50px;
//   width: 50px;
//   border-radius: 50px;
//   margin-right: 15px;
//   font-size: 24px;
// `
//
// const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content:flex-start;
//   align-items: flex-start;
//   margin: 10px;
// `
//
// const Container = styled.div`
//   display: flex;
//   width: 100vw;
//   box-sizing: border-box;
//   height: 100vh;
// `
//
// const SideContainer = styled.div`
//   max-width: 370px;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 10px;
//   box-sizing: border-box;
// `
//
// const FeatureContainer = styled.div`
//   width: 100%;
//   display: flex;
//   background-color: lightgrey;
// `
//
// const AboutText = styled.div`
//   margin: 15px;
// `
//
// const HomeButton = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 40px;
//   width: 40px;
//   border-radius: 40px;
//   background-color: black;
//   cursor: pointer;
// `
