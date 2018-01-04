import React, {Component} from 'react'
import styled from 'styled-components'
import {H2, H3} from '../../ui/h'
import {Button} from '../../ui/buttons'
import {Link} from '../../ui/links'
import {Column} from '../../ui/layout'
import PropTypes from 'prop-types'
import router from 'next/router'

export default class LumeHome extends Component {

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

        <Centered>
          <H2>
            Welcome to Art Stories
          </H2>
          <Button
            onClick={linkToLogin}
          >
            Login to CMS
          </Button>
          <H3>
            Organization Pages
          </H3>
          {(organizations) ? (
            <Column>
              {organizations.map( ({id, name, subdomain}) => (
                <Link
                  key={id}
                  href={{
                    pathname: "/lume",
                    query: {
                      subdomain: subdomain
                    }
                  }}
                  as={`/${subdomain}`}
                >
                  {name}
                </Link>
              ))}
            </Column>
          ): null}

        </Centered>
    )
  }

  linkToLogin = () => {
    router.push('/login')
  }


}

const Centered = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`
