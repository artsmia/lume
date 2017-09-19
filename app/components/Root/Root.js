import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '~/components/Template/Template'
import {H2, H3} from '~/ui/h'
import {createLock} from '~/auth'
import {Button} from '~/ui/buttons'
import {Link} from '~/ui/links'
import {Column} from '~/ui/layout'

export default class Root extends Component {

  render() {

    if (this.props.data.loading) {
      return null
    }

    const {
      showLock,
      props,
      props: {
        data: {
          organizations
        }
      }
    } = this
    return (
      <Template
        {...props}
        drawer={false}
      >
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
          <Column>
            {organizations.map( ({id, name, subdomain}) => (
              <Link
                key={id}
                href={{
                  pathname: "/app",
                  query: {
                    orgSub: subdomain
                  }
                }}
                as={`/${subdomain}`}
              >
                {name}
              </Link>
            ))}
          </Column>
        </Centered>
      </Template>
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
`
