import React, { Component } from 'react'
import styled from 'styled-components'
import { H2 } from '../../mia-ui/text'
import { Loading } from '../../mia-ui/loading'
import StoryList from '../StoryList'
import CreateStoryButton from '../CreateStoryButton'
import PropTypes from 'prop-types'
import { LinkStyled } from '../../mia-ui/links'
import { Icon } from '../../mia-ui/icons'
import { Flex, Box } from 'grid-styled'
import { Page, Card } from '../../mia-ui/layout'
import Head from '../../shared/head'
import Joyride from 'react-joyride'
import Link from 'next/link'
import { Button } from '../../mia-ui/buttons'
import { StoryQuery } from '../../../apollo/queries/story'

export default class CmsHome extends Component {
  // static propTypes = {
  //   organization: PropTypes.shape({
  //     name: PropTypes.string.isRequired
  //   }).isRequired,
  //   user: PropTypes.shape({
  //     id: PropTypes.string.isRequired
  //   }).isRequired,
  //   router: PropTypes.shape({
  //     query: PropTypes.shape({
  //       subdomain: PropTypes.string.isRequired
  //     }).isRequired
  //   }).isRequired
  // }

  startGuidedTour = async () => {
    try {
      let {
        data: { story }
      } = await this.props.client.query({
        query: StoryQuery,
        variables: {
          slugInput: {
            organization: {
              subdomain: this.props.router.query.subdomain
            },
            slug: 'frankenstein-demo'
          }
        }
      })

      if (story) {
        this.props.router.push(
          {
            pathname: '/cms/edit',
            query: {
              subdomain: this.props.router.query.subdomain,
              storySlug: 'frankenstein-demo',
              demo: true
            }
          },
          `/${this.props.router.query.subdomain}/frankenstein-demo`
        )
      } else {
        await this.props.createStory({
          title: 'Frankenstein (Demo)'
        })
        this.props.router.push(
          {
            pathname: '/cms/edit',
            query: {
              subdomain: this.props.router.query.subdomain,
              storySlug: 'frankenstein-demo',
              demo: true
            }
          },
          `/${this.props.router.query.subdomain}/frankenstein-demo`
        )
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    // if (!this.props.organization) return <Loading/>
    const {
      props: {
        user,
        organization,
        router: {
          query: { subdomain }
        }
      }
    } = this

    let showSettings = user.organizations.find(
      org => org.role === 'admin' && org.subdomain === subdomain
    )

    return (
      <Page>
        <Head
          title={organization ? organization.name : 'Organization Stories'}
        />

        <Flex w={1} pb={2}>
          <Box width={9 / 10}>
            <H2>{organization ? organization.name : ''}</H2>
          </Box>
          <Flex width={1 / 10} justifyContent={'flex-end'} id={'org-settings'}>
            {showSettings ? (
              <Link
                href={{
                  pathname: '/cms/orgSettings',
                  query: {
                    subdomain
                  }
                }}
                as={`/${subdomain}/settings`}
              >
                <a>
                  <Icon
                    icon={'settings'}
                    color={'black'}
                    title={'Settings'}
                    size={'30px'}
                  />
                </a>
              </Link>
            ) : null}
          </Flex>
        </Flex>
        <Card p={3}>
          <StoryFlex flexWrap={'wrap'}>
            <CreateFlex w={1} justifyContent={'flex-end'}>
              <CreateStoryButton user={user} id={'create-story'} />
            </CreateFlex>
            <Box width={1}>
              <StoryList />
              <TutorialDiv>
                Want help?{' '}
                <LinkStyled onClick={this.startGuidedTour}>
                  Click here{' '}
                </LinkStyled>{' '}
                to get a tutorial on creating stories.
              </TutorialDiv>
            </Box>
          </StoryFlex>
        </Card>
      </Page>
    )
  }
}

const TutorialDiv = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

const StoryFlex = styled(Flex)`
  position: relative;
`

const CreateFlex = styled(Flex)`
  position: absolute;
`
