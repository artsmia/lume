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


    tips = [
      {
        target: '#story-list',
        content: "These are all your organization's stories",
        placement: 'top-start'
      },
      {
        target: '#create-story-button',
        content: 'Click here to create your first story!',
        placement: 'top-start'
      }
    ]

    componentDidMount(){
      this.props.addTips({
        tips: this.tips
      })
    }

    componentWillUnmount(){
      this.props.removeTips({
        tips: this.tips
      })
    }

  render() {
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
          <StoryFlex
            flexWrap={'wrap'}
          >

            <CreateFlex
              w={1}
              justifyContent={'flex-end'}
            >
              <CreateStoryButton
                userId={userId}
                id={'create-story'}
              />
            </CreateFlex>
            <Box
              width={1}
            >
              <StoryList/>
            </Box>
          </StoryFlex>
        </Card>


      </Page>
    )
  }

}

const StoryFlex = styled(Flex)`
  position: relative;
`

const CreateFlex = styled(Flex)`
  position: absolute;
`
