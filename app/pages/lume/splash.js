import React, { Component } from 'react'
import Template from '../../components/shared/Template'
import Auth from '../../auth'
import { H2, H3, P } from '../../components/mia-ui/text'
import PropTypes from 'prop-types'
import router from 'next/router'
import { Button } from '../../components/mia-ui/buttons'
import { Page, Card } from '../../components/mia-ui/layout'
import { Flex, Box } from 'grid-styled'
import { GridList, Tile } from '../../components/mia-ui/lists'
import { Waiting } from '../../components/mia-ui/loading'
import Link from 'next/link'
import Head from '../../components/shared/head'

export default class LumeSplash extends Component {
  static getInitialProps = async context => {
    try {
      let auth = new Auth(context)

      await auth.getUser()
      return {
        user: auth.user
      }
    } catch (ex) {}
  }

  render() {
    return (
      <Template user={this.props.user}>
        <Page>
          <Card>
            <H2>Welcome to Lume</H2>

          </Card>
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
        </Page>
      </Template>
    )
  }
}
