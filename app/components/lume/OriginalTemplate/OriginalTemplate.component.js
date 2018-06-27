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
      let contentIndex = parseInt(props.router.query.state1)

      if (props.story.contents[0]) {
        if (props.story.contents[0].type !== 'obj') {
          contentIndex = contentIndex - 1
        }
      }

      selectedContent = props.story.contents.find(
        content => content.index === contentIndex
      )
    } else {
      selectedContent =
        props.story.contents.find(content => content.type === 'obj') ||
        props.story.contents[0]
    }

    this.backButtonRef = React.createRef()

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

  componentDidMount() {
    if (this.backButtonRef.focus) {
      this.backButtonRef.focus()
    }

    window.onbeforeprint = e => {
      const { router, subdomain, storySlug } = this.props
      router.push(
        {
          pathname: '/lume/story',
          query: {
            subdomain,
            storySlug,
            print: true
          }
        },
        `/${subdomain}/${storySlug}/print`
      )
    }
  }

  componentWillUnmount() {
    window.onbeforeprint = undefined
  }

  tabKeyDown = e => {
    let tabOrder = ['about', 'details', 'more']

    let leftUp = [37, 38]
    let rightDown = [39, 40]

    let direction

    let currentTabIndex = tabOrder.findIndex(
      tab => tab === this.state.selectedTab
    )

    let nextTabIndex = 0

    if (leftUp.includes(e.keyCode)) {
      nextTabIndex = currentTabIndex - 1
    } else if (rightDown.includes(e.keyCode)) {
      nextTabIndex = currentTabIndex + 1
    } else {
      return
    }

    if (nextTabIndex <= 0) {
      this.selectTabAbout()
    } else if (nextTabIndex === 1) {
      this.selectTabDetails()
    } else if (nextTabIndex >= 2) {
      this.selectTabMore()
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
      <Flex w={1}>
        <Container w={1}>
          {this.props.router.pathname === '/lume/story' ? (
            <Head
              title={story.title}
              analyticsId={customAnalyticsEnabled ? customAnalyticsId : false}
            />
          ) : null}

          <SideContainer
            w={[3 / 4, 1 / 2, 1 / 3]}
            p={1}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            flexDirection={'column'}
            open={drawer}
          >
            {this.props.router.pathname === '/lume/story' ? (
              <Flex w={1} flex={'1 0 auto'}>
                <Button
                  round
                  size={'40px'}
                  onClick={() => {
                    this.props.router.back()
                  }}
                  innerRef={ref => {
                    this.backButtonRef = ref
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
                <NavButton
                  round
                  size={'40px'}
                  href={{
                    pathname: '/lume/story',
                    query: {
                      subdomain,
                      storySlug: story.slug,
                      print: true
                    }
                  }}
                  as={`/${subdomain}/${story.slug}/print`}
                >
                  <Icon color={'white'} icon={'print'} />
                </NavButton>
              </Flex>
            ) : null}

            <Tombstone obj={obj ? obj : story.title} />

            <TabContainer selectedTab={selectedTab}>
              <TabHeader>
                <Tab
                  name={'about'}
                  onClick={selectTabAbout}
                  onKeyDown={this.tabKeyDown}
                >
                  About
                </Tab>
                <Tab
                  name={'details'}
                  onClick={selectTabDetails}
                  onKeyDown={this.tabKeyDown}
                >
                  Details
                </Tab>
                <Tab
                  name={'more'}
                  onClick={selectTabMore}
                  onKeyDown={this.tabKeyDown}
                >
                  More
                </Tab>
              </TabHeader>
              <TabBody name={'about'}>
                <MarkdownContainer p={3} id={'about'}>
                  <Markdown
                    source={
                      objContent ? objContent.description : story.description
                    }
                  />
                </MarkdownContainer>
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
                        <Button round size={'35px'} tabIndex={'0'}>
                          <IndexSpan>{index + 1}</IndexSpan>
                        </Button>
                      }
                    >
                      <Flex flexWrap={'wrap'} id={`detail-${content.index}`}>
                        <MarkdownContainer w={1} p={3}>
                          <Markdown source={content.description} />
                        </MarkdownContainer>

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
                <Flex
                  w={1}
                  flexDirection={'column'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-start'}
                  id={'more'}
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
                      passHref
                    >
                      <RelatedStoryLink tabIndex={'0'}>
                        {story.title}
                      </RelatedStoryLink>
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
      </Flex>
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

    // const {
    //   query: { subdomain, storySlug, state0 },
    //   replace,
    //   pathname
    // } = this.props.router
    //
    // if (pathname === '/lume/story') {
    //   this.props.router.replace(
    //     {
    //       pathname: '/lume/story',
    //       query: {
    //         subdomain,
    //         storySlug,
    //         state0: 'details',
    //         grandTour: this.props.grandTour
    //       }
    //     },
    //     `/${subdomain}/${storySlug}/details`
    //   )
    // }
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

    let contentIndex = content.index

    if (this.props.story.contents[0].type !== 'obj') {
      contentIndex = contentIndex + 1
    }

    if (pathname === '/lume/story') {
      this.props.router.replace(
        {
          pathname: '/lume/story',
          query: {
            subdomain,
            storySlug,
            state0: 'details',
            state1: contentIndex
          }
        },
        `/${subdomain}/${storySlug}/details/${contentIndex}`
      )
    }
  }
}

const MarkdownContainer = styled(Box)`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 16px;
`

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
  font-family: ${({ theme }) => theme.font.light};

  @media print {
    display: none;
  }
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

const RelatedStoryLink = styled.a`
  border: 1px solid lightgrey;
  font-size: 20px;
  cursor: pointer;
  margin: 3px 0;
  padding: 5px;
  width: 100%;
  color: black;
  text-decoration: none;
`

const IndexSpan = styled.span`
  font-size: 25px;
  color: ${({ theme }) => theme.color.white};
`
