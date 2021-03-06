import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import ContentDisplaySwitcher from '../../contents/DisplaySwitcher'
import { H3 } from '../../mia-ui/text'
import { Button, NavButton } from '../../mia-ui/buttons'
import { Icon } from '../../mia-ui/icons'
import router from 'next/router'
import Markdown from 'react-markdown'
import AdditionalImages from '../OriginalTemplate/AdditionalImages'
import AdditionalMedias from '../OriginalTemplate/AdditionalMedias'

import { Flex, Box } from 'grid-styled'
import Head from '../../shared/head'

export default class SliderTemplate extends Component {
  constructor(props) {
    super(props)

    this.backButtonRef = React.createRef()

    let selectedIndex = props.router.query.state0
      ? parseInt(props.router.query.state0) - 1
      : 0

    let selectedContent = props.story.contents.find(
      content => content.index === selectedIndex
    )

    if (!selectedContent && props.story.contents.length > 0) {
      selectedContent = props.story.contents[0]
    }

    this.state = {
      selectedContent,
      drawer: true
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

  render() {
    const {
      state: { selectedContent, drawer },
      props: {
        story,
        organization,
        organization: { customAnalyticsEnabled, customAnalyticsId },
        router: {
          query: { subdomain }
        }
      },
      slide
    } = this

    return (
      <Container w={1}>
        <Head
          title={story.title}
          analyticsId={customAnalyticsEnabled ? customAnalyticsId : false}
        />

        <BookContainer flexDirection={'column'}>
          <HeaderFooter w={1} justifyContent={'center'} alignItems={'center'}>
            <H3 color={'white'}>{story.title}</H3>
          </HeaderFooter>
          <PageContainer w={1}>
            <ContentContainer w={[1, 3 / 4]}>
              {selectedContent ? (
                <ContentDisplaySwitcher content={selectedContent} />
              ) : null}
            </ContentContainer>
            <DrawerButton
              round
              display={''}
              open={drawer}
              onClick={() => {
                this.setState(({ drawer }) => ({ drawer: !drawer }))
              }}
            >
              <Icon color={'white'} icon={'menu'} />
            </DrawerButton>
            <SideContainer
              w={[3 / 4, 1 / 4]}
              p={3}
              flexWrap={'wrap'}
              open={drawer}
              flexDirection={'column'}
            >
              <TopFlex w={1}>
                {this.props.router.pathname === '/lume/story' ? (
                  <Flex w={1}>
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
              </TopFlex>

              {selectedContent ? (
                <Box w={1}>
                  <H3>{selectedContent.title}</H3>
                  <MarkdownContainer>
                    <Markdown source={selectedContent.description} />
                  </MarkdownContainer>
                  <Flex>
                    <AdditionalImages
                      additionalImages={selectedContent.additionalImages}
                    />
                    <AdditionalMedias
                      additionalMedias={selectedContent.additionalMedias}
                    />
                  </Flex>
                </Box>
              ) : null}
            </SideContainer>
          </PageContainer>

          <HeaderFooter w={1} justifyContent={'center'} alignItems={'center'}>
            {selectedContent ? (
              <H3 color={'white'}>
                Page {selectedContent.index + 1} of {story.contents.length}
              </H3>
            ) : (
              <H3 color={'white'}>Page 0 of 0</H3>
            )}
          </HeaderFooter>
        </BookContainer>
        {selectedContent ? (
          <PageButtonContainer w={1} justifyContent={'space-between'}>
            {selectedContent.index !== 0 ? (
              <Button tabIndex={'0'} onClick={() => slide(-1)}>
                Back
              </Button>
            ) : (
              <div />
            )}
            {selectedContent.index < story.contents.length - 1 ? (
              <Button tabIndex={'0'} onClick={() => slide(1)}>
                Forward
              </Button>
            ) : (
              <div />
            )}
          </PageButtonContainer>
        ) : null}
      </Container>
    )
  }

  slide = direction => {
    const {
      state: { selectedContent },
      props: {
        story,
        router: { query, pathname, replace }
      }
    } = this

    this.setState({
      selectedContent: story.contents.find(
        content => content.index === selectedContent.index + direction
      )
    })

    if (pathname === '/lume/story') {
      let newIndex = selectedContent.index + direction + 1

      let path = `/${query.subdomain}/${query.storySlug}/${newIndex}`

      if (newIndex === 1) {
        path = `/${query.subdomain}/${query.storySlug}`
      }

      replace(
        {
          pathname,
          query: {
            ...query,
            state0: newIndex
          }
        },
        path
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
    right: ${({ open }) => (open ? '78%' : '10px')};
  }
`

const TopFlex = styled(Flex)`
  height: 120px;
`

const Container = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  position: relative;
`

const PageButtonContainer = styled(Flex)`
  position: fixed;
  bottom: 25%;
  z-index: 4001;
`
const HeaderFooter = styled(Flex)`
  height: 50px;
  background-color: ${({ theme }) => theme.color.black};
`
const BookContainer = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  position: absolute;
  ${'' /* max-width: 100vw; */};
`

const ContentContainer = styled(Flex)`
  height: 100%;
  @media only screen and (max-width: 40em) {
    position: absolute;
  }
`
const MarkdownContainer = styled(Box)`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 16px;
`

const SideContainer = styled(Flex)`
  height: 100%;
  transition: 0.2s all;
  background-color: white;

  @media only screen and (max-width: 40em) {
    position: absolute;
    z-index: 4000;
    right: 0;
    ${({ open }) =>
      !open
        ? css`
            transform: translateX(100%);
          `
        : null};
  }
`

const PageContainer = styled(Flex)`
  height: 100%;
  position: relative;
  overflow: hidden;
`
