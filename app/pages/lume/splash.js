import React, { Component } from 'react'
import Template from '../../components/shared/Template'
import Auth from '../../auth'
import { H1, H2, H3, P } from '../../components/mia-ui/text'
import PropTypes from 'prop-types'
import router from 'next/router'
import { Button } from '../../components/mia-ui/buttons'
import { Page, Card } from '../../components/mia-ui/layout'
import { Flex, Box } from 'grid-styled'
import { GridList, Tile } from '../../components/mia-ui/lists'
import { Waiting } from '../../components/mia-ui/loading'
import { Link, A } from '../../components/mia-ui/links'
import Head from '../../components/shared/head'
import {
  ParallaxProvider,
  Parallax,
  ParallaxBanner
} from 'react-scroll-parallax'
import styled from 'styled-components'
import Story from '../../components/lume/Story'

export default class LumeSplash extends Component {
  static getInitialProps = async context => {
    try {
      let auth = new Auth(context)

      await auth.getUser()
      return {
        user: auth.user,
        subdomain: 'mia'
      }
    } catch (ex) {}
  }

  state = {
    selectedStorySlug: 'olive-trees'
  }

  constructor(props) {
    super(props)
    this.takeTour = React.createRef()
  }

  componentDidMount() {
    console.log(this.takeTour)
    this.takeTour.focus()
  }

  render() {
    return (
      <ParallaxProvider>
        <Template user={this.props.user}>
          <ParallaxBanner
            layers={[
              {
                image: '/static/lume-ipad.jpg',
                amount: 0.1,
                slowerScrollRate: false
              }
            ]}
          >
            <CheckoutFlex
              w={1}
              flexDirection={'column'}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              pt={5}
              pl={5}
            >
              <Box my={3}>
                <H2 color={'white'} light>
                  Your stories
                </H2>
              </Box>
              <Box my={3}>
                <H2 color={'white'} light>
                  Your site
                </H2>
              </Box>
              <Box my={3}>
                <H2 color={'white'}>Introducing Lume</H2>
              </Box>
              <Box my={3}>
                <H2 color={'white'} light>
                  An interactive storytelling platform from the Minneapolis
                  Institute of Art
                </H2>
              </Box>
              <Flex alignItems={'center'} mt={3}>
                <Button
                  a
                  href={'/mia?grandTour=true'}
                  color={'white'}
                  innerRef={ref => {
                    this.takeTour = ref
                  }}
                >
                  Take the Tour
                </Button>
                <Button a href={'/login'} color={'white'}>
                  Start Creating Stories
                </Button>
              </Flex>
            </CheckoutFlex>
          </ParallaxBanner>

          <Parallax>
            <Flex px={5} py={3}>
              <Button a href={'#demo'}>
                Demo
              </Button>
              <Button a href={'#examples'}>
                Example
              </Button>
              <Button a href={'#code'}>
                See the code
              </Button>
            </Flex>
          </Parallax>
          <Parallax>
            <StoryFlex
              id={'demo'}
              w={1}
              py={4}
              px={5}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              flexDirection={'column'}
            >
              <Flex
                mb={1}
                alignItems={'flex-start'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
              >
                <H2>Build Interactive Stories</H2>
                <Flex alignItems={'center'}>
                  <A
                    color={'blue'}
                    onClick={() => {
                      this.setState({ selectedStorySlug: 'olive-trees' })
                    }}
                    tabIndex={'0'}
                    onKeyPress={({ keyCode }) => {
                      if (keyCode === 0) {
                        this.setState({ selectedStorySlug: 'olive-trees' })
                      }
                    }}
                  >
                    <H3
                      light
                      color={
                        this.state.selectedStorySlug === 'olive-trees'
                          ? 'black'
                          : 'gray60'
                      }
                    >
                      Olive Trees, Vincent Van Gogh
                    </H3>
                  </A>
                  <Box p={3}>|</Box>
                  <A
                    color={'blue'}
                    onClick={() => {
                      this.setState({
                        selectedStorySlug: 'royal-propaganda-in-the-renaissance'
                      })
                    }}
                    tabIndex={'0'}
                    onKeyPress={({ keyCode }) => {
                      if (keyCode === 0) {
                        this.setState({
                          selectedStorySlug:
                            'royal-propaganda-in-the-renaissance'
                        })
                      }
                    }}
                  >
                    <H3
                      light
                      color={
                        this.state.selectedStorySlug ===
                        'royal-propaganda-in-the-renaissance'
                          ? 'black'
                          : 'gray60'
                      }
                    >
                      Royal Propaganda in the Renaissance
                    </H3>
                  </A>
                </Flex>
              </Flex>
              <Story
                subdomain={'mia'}
                storySlug={this.state.selectedStorySlug}
              />
            </StoryFlex>
          </Parallax>

          <ParallaxBanner
            layers={[
              {
                image: '/static/mia-home-splash.png',
                amount: 0.3,
                slowerScrollRate: false
              }
            ]}
          >
            <CheckoutFlex
              w={1}
              px={5}
              py={4}
              alignItems={'center'}
              id={'examples'}
            >
              <Link
                href={{
                  pathname: '/lume',
                  query: {
                    subdomain: 'mia'
                  }
                }}
                as={`/mia`}
              >
                <H1 color={'white'}>Checkout Mia's Stories</H1>
              </Link>
            </CheckoutFlex>
          </ParallaxBanner>
          <ParallaxBanner
            layers={[
              {
                image: '/static/code-splash.png',
                amount: 0.3,
                slowerScrollRate: false
              }
            ]}
          >
            <WhiteFlex
              w={1}
              px={5}
              py={4}
              alignItems={'center'}
              id={'examples'}
              justifyContent={'flex-end'}
              id={'code'}
            >
              <A href={'https://github.com/artsmia/lume'}>
                <H1>Visit the Repository on GitHub</H1>
              </A>
            </WhiteFlex>
          </ParallaxBanner>
          <Parallax>
            <BlackFlex px={5} py={3} flexDirection={'column'}>
              <Box my={4}>
                <H2 color={'white'}>Created by</H2>
              </Box>

              <Box my={4}>
                <H3 color={'white'}>Generous Support Provided By</H3>
              </Box>
            </BlackFlex>
          </Parallax>
        </Template>
      </ParallaxProvider>
    )
  }
}

const BlackFlex = styled(Flex)`
  background-color: black;
`

const CheckoutFlex = styled(Flex)`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.color.black},
    ${({ theme }) => theme.color.gray30}
  );
  z-index: 1;
  position: absolute;
  height: 100%;
`

const WhiteFlex = styled(Flex)`
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.9)
  );
  z-index: 1;
  position: absolute;
  height: 100%;
`

const WelcomeBox = styled(Flex)`
  background-color: black;
`

const StoryFlex = styled(Flex)`
  background-color: lightgrey;
`
