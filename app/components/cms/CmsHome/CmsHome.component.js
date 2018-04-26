import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Loading} from '../../mia-ui/loading'
import StoryList from '../StoryList'
import CreateStoryButton from '../CreateStoryButton'
import PropTypes from 'prop-types'
import {NextA} from '../../mia-ui/links'
import {Icon} from '../../mia-ui/icons'
import {Flex, Box} from 'grid-styled'
import {Page, Card} from '../../mia-ui/layout'
import Head from '../../shared/head'

export default class CmsHome extends Component {

  // static propTypes = {
  //   organization: PropTypes.shape({
  //     name: PropTypes.string.isRequired
  //   }),
  //   user: PropTypes.shape({
  //     id: PropTypes.string.isRequired
  //   })
  // }


  render() {

    console.log("CmsHome rendered")
    // if (!this.props.organization) return <Loading/>

    const {
      props: {
        user,
        user: {
          id: userId
        },
        organization,
        router: {
          query: {
            subdomain
          }
        }
      }
    } = this

    let showSettings = user.organizations.find( org => (org.role === 'admin' && org.subdomain === subdomain))

    return (
      <Page>
        <Head
          title={organization ? organization.name : "Organization Stories"}
        />
        <Flex
          w={1}
          pb={2}
        >
          <Box
            width={9/10}
          >
            <H2>
              {organization ? organization.name : ""}
            </H2>
          </Box>
          <Flex
            width={1/10}
            justifyContent={'flex-end'}
          >
            {showSettings ? (
              <NextA
                href={{
                  pathname: '/cms/orgSettings',
                  query: {
                    subdomain,
                  }
                }}
                as={`/cms/${subdomain}/settings`}
              >
                  <Icon
                    icon={'settings'}
                    color={'black'}
                    title={"Settings"}
                    size={'30px'}
                  />
              </NextA>
            ): null}

          </Flex>
        </Flex>
        <Card
          p={3}
        >
          <Flex
            flexWrap={'wrap'}
          >

            <Box
              width={1}
            >
              <CreateStoryButton
                userId={userId}
              />
            </Box>
            <Box
              width={1}
            >
              <StoryList/>
            </Box>
          </Flex>
        </Card>


      </Page>
    )
  }

}
