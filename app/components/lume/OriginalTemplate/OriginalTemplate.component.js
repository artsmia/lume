import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import {TabContainer, TabHeader, Tab, TabBody} from '../../mia-ui/tabs'
import Tombstone from './Tombstone'
import Zoomer, {StoryZoomer} from '../../shared/Zoomer'
import ContentDisplaySwitcher from '../../contents/DisplaySwitcher'
import {Button, NavButton} from '../../mia-ui/buttons'
import {Icon} from '../../mia-ui/icons'
import Link from 'next/link'
import Markdown from 'react-markdown'
import AdditionalImages from './AdditionalImages'
import AdditionalMedias from './AdditionalMedias'

import {Flex, Box} from 'grid-styled'
import {Expander} from '../../mia-ui/expanders'
import {H3} from '../../mia-ui/text'
import Head from '../../shared/head'


export default class OriginalTemplate extends Component {


  constructor(props){
    super(props)


    let selectedContent = {
      id: ''
    }


    if (props.router.query.state1 && props.story.contents){
      selectedContent = props.story.contents.find(content => content.index === parseInt(props.router.query.state1))
    } else {
      selectedContent = props.story.contents.find(content => content.type === "obj") || props.story.contents[0]
    }

    this.state = {
      drawer: true,
      ...this.state,
      selectedContent,
      selectedTab: this.props.router.query.state0 || 'about',

    }
  }


  render() {

    if (this.props.story.contents.length < 1){
      return (
        <Container
          w={1}
        >

        </Container>
      )
    }

    const {
      state: {
        selectedTab,
        selectedContent,
        drawer
      },
      props: {
        story,
        router,
        router: {
          query: {
            subdomain
          }
        },
        organization,
        organization: {
          customAnalyticsEnabled,
          customAnalyticsId
        }
      },
      handleContentSelection,
      createMoreGeometry,
      selectTabAbout,
      selectTabDetails,
      selectTabMore
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
        <Head
          title={story.title}
          analyticsId={customAnalyticsEnabled ? customAnalyticsId : false}
        />

        <SideContainer
          w={[3/4,1/2, 1/3]}
          p={1}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          flexDirection={'column'}
          open={drawer}
        >
          <Box
            w={1}
          >
            <NavButton
              href={{
                pathname: '/lume',
                query: {
                  subdomain
                }
              }}
              size={'40px'}
              as={`/${subdomain}`}
              round
            >
              <Icon
                color={"white"}
                icon={"arrow_back"}
              />
            </NavButton>
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
                onClick={selectTabAbout}
              >
                About
              </Tab>
              <Tab
                name={"details"}
                onClick={selectTabDetails}
              >
                Details
              </Tab>
              <Tab
                name={"more"}
                onClick={selectTabMore}
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
              <DetailsContainer
                w={1}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                flexDirection={"column"}
              >
                {otherContents.map( (content) => (
                  <Expander
                    border={false}
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
                        size={'35px'}
                      >
                        <IndexSpan>
                          {content.index}

                        </IndexSpan>
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

                        <Flex
                          w={1}
                          p={3}
                        >
                          <AdditionalImages
                            additionalImages={content.additionalImages}
                            organization={organization}
                          />
                          <AdditionalMedias
                            additionalMedias={content.additionalMedias}
                            organization={organization}
                          />

                        </Flex>






                    </Flex>

                  </Expander>
                ))}
              </DetailsContainer>

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
                        storySlug: story.slug
                      }
                    }}
                    as={`/${subdomain}/${story.slug}`}
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
        <DrawerButton
          round
          onClick={()=>{this.setState(({drawer})=>({drawer: !drawer}))}}
          open={drawer}
        >
          <Icon
            icon={'menu'}
            color={'white'}
          />
        </DrawerButton>


        <FeatureContainer
          w={[1, 1/2, 2/3]}
        >

          {this.showFeature()}
        </FeatureContainer>
      </Container>
    )
  }



  selectTabAbout=()=>{
    let objContent = this.props.story.contents.find(content => content.type === 'obj')

    this.setState({
      selectedTab: "about",
      selectedContent: objContent
    })

    const {
      query: {
        subdomain,
        storySlug,
        state0,
      },
      replace,
      pathname
    } = this.props.router

    if(pathname === '/lume/story'){
      this.props.router.replace({
        pathname: '/lume/story',
        query: {
          subdomain,
          storySlug,
          state0: 'about'
        },
      }, `/${subdomain}/${storySlug}`)
    }



  }

  selectTabDetails = () => {
    let objContent = this.props.story.contents.find(content => content.type === 'obj')

    this.setState({
      selectedTab: "details",
      selectedContent: {
        id: '',
        type: 'all',
      },
    })

    const {
      query: {
        subdomain,
        storySlug,
        state0,
      },
      replace,
      pathname
    } = this.props.router

    if(pathname === '/lume/story'){
      this.props.router.replace({
        pathname: '/lume/story',
        query: {
          subdomain,
          storySlug,
          state0: 'details'
        },
      }, `/${subdomain}/${storySlug}/details`)
    }


  }

  selectTabMore= () => {
    let objContent = this.props.story.contents.find(content => content.type === 'obj')

    this.setState({
      selectedTab: "more",
      selectedContent: {
        id: '',
        type: 'all',
      },
    })

    const {
      query: {
        subdomain,
        storySlug,
        state0,
      },
      replace,
      pathname
    } = this.props.router

    if(pathname === '/lume/story'){
      this.props.router.replace({
        pathname: '/lume/story',
        query: {
          subdomain,
          storySlug,
          state0: 'more'
        },
      }, `/${subdomain}/${storySlug}/more`)
    }

  }


  showFeature = () => {

    const {
      selectedContent
    } = this.state

    if (
      selectedContent.type !== 'detail' &&
      selectedContent.type !== 'all'
    ){
      return (
        <ContentDisplaySwitcher
          content={selectedContent}
        />
      )
    }

    if (
      selectedContent.type === 'detail' ||
      selectedContent.type === 'all'
    ) {
      return (
        <StoryZoomer
          mode={'content'}
          storyId={this.props.story.id}
          selectedContentId={selectedContent.id}
          onContentSelection={this.handleContentSelection}
        />
      )
    }



  }




  handleContentSelection = (content) => {
    this.setState({
      selectedContent: content
    })

    const {
      query: {
        subdomain,
        storySlug,
        state0,
      },
      replace,
      pathname
    } = this.props.router

    if(pathname === '/lume/story'){
      this.props.router.replace({
        pathname: '/lume/story',
        query: {
          subdomain,
          storySlug,
          state0: 'details',
          state1: content.index
        },
      }, `/${subdomain}/${storySlug}/details/${content.index}`)
    }


  }


}

const DrawerButton = styled(Button)`
  transition: .2s all;
  visibility: hidden;
  position: absolute;
  @media only screen and (max-width: 40em) {
    visibility: visible;
    height:50px;
    width: 50px;
    z-index: 5000;
    bottom: 10px;
    left: ${({open}) => open ? '78%': '10px'};

  }

`

const DetailsContainer = styled.div`
  overflow-y: scroll;
  height: 100%;
`

const Container = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
`
const SideContainer = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  transition: .2s all;
  overflow-y: scroll;
  @media only screen and (max-width: 40em) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5000;
    background-color: white;
    ${({open}) => !open ? css`
      transform: translateX(-100%);
    ` : null}
  }
`
const FeatureContainer = styled(Flex)`
  height: 100vh;
  max-height: 100vh;

  @media only screen and (max-width: 40em) {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const RelatedStoryBox = styled(Box)`
  border: 1px solid lightgrey;
  font-size: 20px;
  cursor: pointer;
`

const IndexSpan = styled.span`
  font-size: 25px;
  color: ${({theme}) => theme.color.white};
`
