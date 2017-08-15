import React, {Component} from 'react'
import AppTemplate from '../AppTemplate/Template'
import {Centered} from '../AppTemplate/Template'
import {H2, H3} from '../../ui/h'
import {createLock} from '../../auth'
import {Button} from '../../ui/buttons'
import {Link} from '../../ui/links'
import {Column} from '../../ui/layout'

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
      <AppTemplate
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
                  href: {
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
      </AppTemplate>
    )
  }

  showLock = () => {
    const lock = createLock()
    lock.show()
  }

}
