import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { TabContainer, TabHeader, Tab, TabBody } from '../../mia-ui/tabs'
import Tombstone from './Tombstone'
import Zoomer, { StoryZoomer } from '../../shared/Zoomer'
import ContentDisplaySwitcher from '../../contents/DisplaySwitcher'
import { Button, NavButton } from '../../mia-ui/buttons'
import { Icon } from '../../mia-ui/icons'
import Link from 'next/link'
import Markdown from 'react-markdown'
import AdditionalImages from './AdditionalImages'
import AdditionalMedias from './AdditionalMedias'

import { Flex, Box } from 'grid-styled'
import { Expander } from '../../mia-ui/expanders'
import { H3 } from '../../mia-ui/text'
import Head from '../../shared/head'
import Joyride from 'react-joyride'

export default class OriginalTemplate extends Component {
  constructor(props) {
    super(props)

    let selectedContent = {
      id: ''
    }

    if (props.router.query.state1 && props.story.contents) {
      selectedContent = props.story.contents.find(
        content => content.index === parseInt(props.router.query.state1)
      )
    } else {
      selectedContent =
        props.story.contents.find(content => content.type === 'obj') ||
        props.story.contents[0]
    }

    this.state = {
      drawer: true,
      ...this.state,
      selectedContent,
      selectedTab: this.props.router.query.state0 || 'about',
      grandTourIndex: 0,
      grandTourSteps: [
        {
          target: 'body',
          content: (
            <div>
              <p>
                Writing Desk is an Object Story about, believe it or not, a
                writing desk!
              </p>
              <Button
                onClick={() => {
                  this.setState(({ grandTourIndex }) => ({
                    grandTourIndex: grandTourIndex + 1
                  }))
                }}
              >
                Next
              </Button>
            </div>
          ),
          placement: 'center',
          disableBeacon: true
        },
        {
          target: '#tombstone',
          content: (
            <div>
              <p>
                Tombstone information tells you more about the specific object
                in Mia's collection
              </p>
              <Button
                onClick={() => {
                  this.setState(({ grandTourIndex }) => ({
                    grandTourIndex: grandTourIndex + 1
                  }))
                }}
              >
                Next
              </Button>
            </div>
          ),
          placement: 'right',
          disableBeacon: true
        },
        {
          target: '#about',
          content: (
            <div>
              <p>Additional information about the Object appears here.</p>
              <Button
                onClick={() => {
                  this.setState(({ grandTourIndex }) => ({
                    grandTourIndex: grandTourIndex + 1
                  }))
                }}
              >
                Next
              </Button>
            </div>
          ),
          placement: 'right',
          disableBeacon: true
        },
        {
          target: '#tab-header',
          content: (
            <div>
              <p>
                You can toggle the tabs on an Object Story to explore an
                object's details or to discover more related stories.
              </p>
              <Button
                onClick={() => {
                  this.setState(({ grandTourIndex }) => ({
                    grandTourIndex: grandTourIndex + 1
                  }))
                  this.selectTabDetails()
                }}
              >
                See Details
              </Button>
            </div>
          ),
          placement: 'right',
          disableBeacon: true
        },
        {
          target: '#details',
          content: (
            <div>
              <p>
                Object stories feature a list of details that explore some of
                the nuances of the object.{' '}
              </p>
              <Button
                onClick={() => {
                  this.setState(({ grandTourIndex }) => ({
                    grandTourIndex: grandTourIndex + 1,
                    selectedContent: this.props.story.contents.find(
                      content => content.index === 4
                    )
                  }))
                }}
              >
                Check Out A Detail
              </Button>
            </div>
          ),
          placement: 'right',
          disableBeacon: true
        },
        {
          target: '#detail-4',
          content: (
            <div>
              <p>
                Details highlight interesting information about a specific part
                of the object and may also feature additional images, videos, or
                audio.
              </p>
              <Button
                onClick={() => {
                  this.setState(({ grandTourIndex }) => ({
                    grandTourIndex: grandTourIndex + 1
                  }))
                }}
              >
                Next
              </Button>
            </div>
          ),
          placement: 'right',
          disableBeacon: true
        },
        {
          target: '#feature-container',
          content: (
            <div>
              <p>
                Notice how the display will show zoom in and highlight a
                particular detail for you.
              </p>
              <Button
                onClick={() => {
                  this.setState(({ grandTourIndex }) => ({
                    grandTourIndex: grandTourIndex + 1
                  }))
                  this.selectTabMore()
                }}
              >
                Next
              </Button>
            </div>
          ),
          placement: 'right',
          disableBeacon: true
        },
        {
          target: '#more',
          content: (
            <div>
              <p>
                The 'More' tab gives you an oportunity to explore other stories
                which might be related to Writing Desk.
              </p>
              <p>Now let's check out a Thematic Story!</p>
              <Button
                onClick={() => {
                  this.props.router.push(
                    {
                      pathname: '/'
                      // pathname: '/lume/story',
                      // query: {
                      //   subdomain: 'mia',
                      //   storySlug: ''
                      // }
                    },
                    '/'
                  )
                }}
              >
                Done
              </Button>
            </div>
          ),
          placement: 'right',
          disableBeacon: true
        }
      ]
    }
  }

  render() {
    // if (this.props.story.contents.length < 1) {
    //   return <Container w={1} />
    // }

    const {
      state: { selectedTab, selectedContent, drawer },
      props: {
        story,
        router,
        router: {
          query: { subdomain }
        },
        organization,
        organization: { customAnalyticsEnabled, customAnalyticsId }
      },
      handleContentSelection,
      createMoreGeometry,
      selectTabAbout,
      selectTabDetails,
      selectTabMore
    } = this

    let objContent = story.contents.find(content => content.type === 'obj')

    let firstDetailContent = story.contents.find(
      content => content.type === 'detail'
    )

    let firstContent = objContent || story.contents[0]

    let otherContents = story.contents.slice()

    if (objContent) {
      otherContents = otherContents.filter(
        content => content.id !== objContent.id
      )
    }

    let obj = false

    if (objContent) {
      if (objContent.obj) {
        obj = objContent.obj
      }
    }

    return (
      <Container w={1}>
        <Head
          title={story.title}
          analyticsId={customAnalyticsEnabled ? customAnalyticsId : false}
        />

        <SideContainer
          w={[3 / 4, 1 / 2, 1 / 3]}
          p={1}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          flexDirection={'column'}
          open={drawer}
        >
          {this.props.router.pathname === '/lume/story' ? (
            <Flex w={1}>
              <Button
                round
                size={'40px'}
                onClick={() => {
                  this.props.router.back()
                }}
              >
                <Icon color={'white'} icon={'arrow_back'} />
              </Button>
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
                <Icon color={'white'} icon={'home'} />
              </NavButton>
            </Flex>
          ) : null}

          {obj ? (
            <Tombstone obj={obj} />
          ) : (
            <Tombstone obj={{ title: story.title }} />
          )}

          <TabContainer selectedTab={selectedTab}>
            <TabHeader>
              <Tab name={'about'} onClick={selectTabAbout}>
                About
              </Tab>
              <Tab name={'details'} onClick={selectTabDetails}>
                Details
              </Tab>
              <Tab name={'more'} onClick={selectTabMore}>
                More
              </Tab>
            </TabHeader>
            <TabBody name={'about'}>
              <Box p={3} id={'about'}>
                <Markdown source={obj ? obj.description : story.description} />
              </Box>
            </TabBody>
            <TabBody name={'details'}>
              <DetailsContainer
                w={1}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                flexDirection={'column'}
                id={'details'}
              >
                {otherContents.map((content, index) => (
                  <Expander
                    border={false}
                    key={content.id}
                    open={selectedContent.id === content.id}
                    onRequestOpen={() => {
                      handleContentSelection(content)
                    }}
                    onRequestClose={() => {
                      this.setState({
                        selectedContent: {
                          type: 'all'
                        }
                      })
                    }}
                    header={<H3>{content.title}</H3>}
                    icon={
                      <Button round size={'35px'}>
                        <IndexSpan>{index + 1}</IndexSpan>
                      </Button>
                    }
                  >
                    <Flex flexWrap={'wrap'} id={`detail-${content.index}`}>
                      <Box w={1} p={3}>
                        <Markdown source={content.description} />
                      </Box>

                      <Flex w={1} p={3}>
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
            <TabBody name={'more'}>
              <Flex flexWrap={'wrap'} id={'more'}>
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
                    <RelatedStoryBox w={1} my={2} mx={1} p={2}>
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
          onClick={() => {
            this.setState(({ drawer }) => ({ drawer: !drawer }))
          }}
          open={drawer}
        >
          <Icon icon={'menu'} color={'white'} />
        </DrawerButton>

        <FeatureContainer w={[1, 1 / 2, 2 / 3]} id={'feature-container'}>
          {this.showFeature()}
        </FeatureContainer>
        <Joyride
          run={this.props.grandTour ? true : false}
          steps={this.state.grandTourSteps}
          stepIndex={this.state.grandTourIndex}
          styles={{
            options: {
              zIndex: 10000
            },
            buttonClose: {
              display: 'none'
            },
            buttonNext: {
              display: 'none'
            },
            buttonBack: {
              display: 'none'
            }
          }}
          disableOverlayClose={true}
        />
      </Container>
    )
  }

  selectTabAbout = () => {
    let objContent = this.props.story.contents.find(
      content => content.type === 'obj'
    )

    this.setState({
      selectedTab: 'about',
      selectedContent: objContent
    })

    const {
      query: { subdomain, storySlug, state0 },
      replace,
      pathname
    } = this.props.router

    if (pathname === '/lume/story') {
      this.props.router.replace(
        {
          pathname: '/lume/story',
          query: {
            subdomain,
            storySlug,
            state0: 'about'
          }
        },
        `/${subdomain}/${storySlug}`
      )
    }
  }

  selectTabDetails = () => {
    let objContent = this.props.story.contents.find(
      content => content.type === 'obj'
    )

    this.setState({
      selectedTab: 'details',
      selectedContent: {
        id: '',
        type: 'all'
      }
    })

    const {
      query: { subdomain, storySlug, state0 },
      replace,
      pathname
    } = this.props.router

    if (pathname === '/lume/story') {
      this.props.router.replace(
        {
          pathname: '/lume/story',
          query: {
            subdomain,
            storySlug,
            state0: 'details',
            grandTour: this.props.grandTour
          }
        },
        `/${subdomain}/${storySlug}/details`
      )
    }
  }

  selectTabMore = () => {
    let objContent = this.props.story.contents.find(
      content => content.type === 'obj'
    )

    this.setState({
      selectedTab: 'more',
      selectedContent: {
        id: '',
        type: 'all'
      }
    })

    const {
      query: { subdomain, storySlug, state0 },
      replace,
      pathname
    } = this.props.router

    if (pathname === '/lume/story') {
      this.props.router.replace(
        {
          pathname: '/lume/story',
          query: {
            subdomain,
            storySlug,
            state0: 'more',
            grandTour: this.props.grandTour
          }
        },
        `/${subdomain}/${storySlug}/more`
      )
    }
  }

  showFeature = () => {
    const { selectedContent } = this.state

    if (!selectedContent) {
      return null
    }

    if (selectedContent.type !== 'detail' && selectedContent.type !== 'all') {
      return <ContentDisplaySwitcher content={selectedContent} />
    }

    if (selectedContent.type === 'detail' || selectedContent.type === 'all') {
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

  handleContentSelection = content => {
    this.setState({
      selectedContent: content
    })

    const {
      query: { subdomain, storySlug, state0 },
      replace,
      pathname
    } = this.props.router

    if (pathname === '/lume/story') {
      this.props.router.replace(
        {
          pathname: '/lume/story',
          query: {
            subdomain,
            storySlug,
            state0: 'details',
            state1: content.index
          }
        },
        `/${subdomain}/${storySlug}/details/${content.index}`
      )
    }
  }
}

const DrawerButton = styled(Button)`
  transition: 0.2s all;
  visibility: hidden;
  position: absolute;
  @media only screen and (max-width: 40em) {
    visibility: visible;
    height: 50px;
    width: 50px;
    z-index: 5000;
    bottom: 10px;
    left: ${({ open }) => (open ? '78%' : '10px')};
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
  transition: 0.2s all;
  overflow-y: scroll;
  background-color: white;
  @media only screen and (max-width: 40em) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5000;
    background-color: white;
    ${({ open }) =>
      !open
        ? css`
            transform: translateX(-100%);
          `
        : null};
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
  color: ${({ theme }) => theme.color.white};
`
