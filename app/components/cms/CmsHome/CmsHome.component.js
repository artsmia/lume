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

export default class CmsHome extends Component {

  static propTypes = {
    organization: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    user: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }


  render() {

    if (!this.props.organization) return <Loading/>

    const {
      props: {
        user: {
          id: userId
        },
        organization: {
          name
        },
        router: {
          query: {
            subdomain
          }
        }
      }
    } = this

    return (
      <Page>
        <Card>
          <Flex
            flexWrap={'wrap'}
          >
            <Box
              width={9/10}
            >
              <H2>
                {name}
              </H2>
            </Box>
            <Box
              width={1/10}
            >
              <NextA
                href={{
                  pathname: '/cms/orgSettings',
                  query: {
                    subdomain: subdomain,
                  }
                }}
                as={`/${subdomain}/settings`}
              >
                  <Icon
                    icon={'settings'}
                    color={'black'}
                    title={"Settings"}
                  />
              </NextA>
            </Box>
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
