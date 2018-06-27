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
import { Link } from '../../components/mia-ui/links'
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

  render() {
    return (
      <ParallaxProvider>
        <Template user={this.props.user}>
          <ParallaxBanner
            layers={[
              {
                image: '/static/lume-ipad.jpg',
                amount: 0.3,
                slowerScrollRate: false
              }
            ]}
          >
            <CheckoutFlex
              w={1}
              flexDirection={'column'}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              pt={6}
              pl={5}
            >
              <Box my={2}>
                <H3 color={'white'}>
                  <i>Your stories</i>
                </H3>
              </Box>
              <Box my={2}>
                <H3 color={'white'}>
                  <i>Your site</i>
                </H3>
              </Box>
              <H1 color={'white'}>Introducing Lume</H1>
              <Box my={2} mb={4}>
                <H2 color={'white'}>
                  An interactive storytelling platform from Mia
                </H2>
              </Box>
              <Button a href={'/login'} color={'blue'}>
                Start Creating Stories
              </Button>
            </CheckoutFlex>
          </ParallaxBanner>

          <Parallax>
            <Flex px={5} py={3}>
              <Button a href={'#demo'}>
                Demo
              </Button>
              <Button a href={'#example'}>
                Example
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
              <Box mb={3}>
                <H2>Build Interactive Stories</H2>
              </Box>
              <Story subdomain={'mia'} storySlug={'olive-trees'} />
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
        </Template>
      </ParallaxProvider>
    )
  }
}

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

const WelcomeBox = styled(Flex)`
  background-color: black;
`

const StoryFlex = styled(Flex)`
  background-color: lightgrey;
`
