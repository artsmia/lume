import React, {Component} from 'react'
import styled from 'styled-components'
import {H2, H3} from '../../ui/h'
import {createLock} from '../../../utils/auth-client'
import {Button} from '../../ui/buttons'
import {Link} from '../../ui/links'
import {Column} from '../../ui/layout'
import PropTypes from 'prop-types'

export default class LumeHome extends Component {

  render() {

    const {
      showLock,
      props,
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
            onClick={showLock}
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

  showLock = () => {
    const lock = createLock()
    lock.show()
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
