import React, { Component } from 'react'
import styled from 'styled-components'
import { H2, H3, P } from '../../mia-ui/text'
import PropTypes from 'prop-types'
import router from 'next/router'
import { Button } from '../../mia-ui/buttons'
import { Page, Card } from '../../mia-ui/layout'
import { Flex, Box } from 'grid-styled'
import { GridList, Tile } from '../../mia-ui/lists'
import { Waiting } from '../../mia-ui/loading'
import Link from 'next/link'
import Head from '../../shared/head'

export default class Home extends Component {
  render() {
    const {
      showLock,
      props,
      linkToLogin,
      props: { organizations }
    } = this

    return (
      <Page>
        <Head title={'Welcome'} />
        <Card>
          <H2>Lume</H2>
          <P>
            Lume is a tool for telling stories. It was created by The
            Minneapolis Institute of Art with the support of the Knight
            Foundation to allow anyone (especially museum educators and
            curators) to present content in an interactive and compelling way.
          </P>

          {process.env.AUTH_STRATEGY !== 'local' ? (
            <Box>
              <P>
                You can check out Mia's Lume{' '}
                <Link
                  href={{
                    pathname: '/lume',
                    query: {
                      subdomain: 'mia'
                    }
                  }}
                  as={'/mia'}
                >
                  here
                </Link>{' '}
                or try creating your own stories by logging in or signing up
                below.
              </P>
              <Button onClick={linkToLogin}>Login or Signup</Button>
            </Box>
          ) : null}

          {process.env.AUTH_STRATEGY === 'local' ? (
            <Box>
              <H3>You are currently using Lume in Local Mode</H3>
            </Box>
          ) : null}
        </Card>

        <Flex flexWrap={'wrap'}>
          <Box w={[1, 1 / 2, 1 / 2]} pr={[0, 3, 3]} my={3}>
            <Card>
              <H3>New to Lume? Check out our tutorials</H3>

              <Link
                href={{
                  pathname: '/lume',
                  query: {
                    subdomain: 'mia',
                    grandTour: true
                  }
                }}
                as={`/mia`}
              >
                <a>Take a tour!</a>
              </Link>
            </Card>
          </Box>

          <Box w={[1, 1 / 2, 1 / 2]} my={3}>
            <Card>
              <H3>Featured Organizations</H3>
              <P>See more examples of what you can create with Lume.</P>

              <Flex>
                <Link
                  href={{
                    pathname: '/lume',
                    query: {
                      subdomain: 'mia'
                    }
                  }}
                  as={'/mia'}
                >
                  <a>Minneapolis Institute of Art</a>
                </Link>
              </Flex>
            </Card>
          </Box>
        </Flex>
      </Page>
    )
  }

  linkToLogin = () => {
    if (process.env.AUTH_STRATEGY === 'local') {
      router.push(
        {
          pathname: '/cms',
          query: {
            subdomain: 'local'
          }
        },
        '/local/cms'
      )
    } else {
      window.location.href = '/login'
    }
  }
}
