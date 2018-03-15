import React, {Component} from 'react'
import styled from 'styled-components'
import {H2, H3, P} from '../../mia-ui/text'
//import {Button} from '../../ui/buttons'
// import {Link} from '../../ui/links'
// import {Column} from '../../ui/layout'
import PropTypes from 'prop-types'
import router from 'next/router'
import {Button} from '../../mia-ui/buttons'
import {Page, Card} from '../../mia-ui/layout'
import {Flex, Box} from 'grid-styled'
import {GridList, Tile} from '../../mia-ui/lists'


export default class Home extends Component {

  render() {

    const {
      showLock,
      props,
      linkToLogin,
      props: {
        organizations,
      }
    } = this

    return (
        <Page>
            <Card>
              <H2>
                Lume
              </H2>
              <P>
                Lume is a tool for telling stories. It was created by Mia with the support of the Knight foundation to allow anyone (especially museum educators and curators) to present content in a interactive and compelling way.
              </P>
              <P>
                You can check out Mia's Lume here or try creating your own Lume by logging in below.
              </P>
              <Button
                onClick={linkToLogin}
              >
                Login to CMS
              </Button>
            </Card>

            <Flex
              flexWrap={'wrap'}
            >
              <Box
                w={[1,1/2,1/2]}
                pr={[0,3,3]}
                my={3}
              >
                <Card>
                  <H3>
                    New to Lume?
                  </H3>

                  <P>
                    Try out the tutorial.
                  </P>
                </Card>
              </Box>

              <Box
                w={[1,1/2,1/2]}
                my={3}
              >
                <Card>
                  <H3>
                    Organization Pages
                  </H3>
                  <P>
                    See more examples of what you can create with Lume.
                  </P>

                  <GridList>
                    {organizations ? organizations.map( ({id, name, subdomain}) => (
                      <Tile
                        key={id}
                        text={name}
                        href={{
                          pathname: '/lume',
                          query: {
                            subdomain
                          }
                        }}
                        as={`/${subdomain}`}
                      />
                    )) : null}
                  </GridList>

                </Card>
              </Box>

            </Flex>







        </Page>
    )
  }

  linkToLogin = () => {
    if (process.env.AUTH_STRATEGY === 'local') {
      router.push({
        pathname: '/cms',
        query: {
          subdomain: 'local',
        }
      }, '/local/cms')
    } else {
      window.location.href = '/login'
    }
  }


}

// const Centered = styled.div`
//   width: 50%;
//   margin: auto;
//   display: flex;
//   margin-top: 50px;
//   flex-direction: column;
//   align-items: flex-start;
//   padding: 20px;
// `
