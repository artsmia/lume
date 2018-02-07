import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import StoryList from '../StoryList'
import CreateStoryButton from '../CreateStoryButton'
import PropTypes from 'prop-types'
import {Row} from '../../ui/layout'
import Link from 'next/link'
import Icon from '../../ui/icons'

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

    if (!this.props.organization) return <Spinner/>

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
      <Container>
        <TopRow>
          <H2>
            {name}
          </H2>
          <Link
            href={{
              pathname: '/cms/orgSettings',
              query: {
                subdomain: subdomain,
              }
            }}
            as={`/${subdomain}/settings`}
          >
            <A>
              <Icon
                icon={'settings'}
                color={'black'}
              />
            </A>
          </Link>
        </TopRow>


        <CreateStoryButton
          userId={userId}
        />

        <StoryList/>

      </Container>
    )
  }

}

const TopRow = styled(Row)`
  justify-content: space-between;
`

const A = styled.a`
  cursor: pointer;

`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  width: 50%;
  align-items: flex-start;
  border: 1px solid black;
  min-height: 100vh;
  padding: 20px;
`
