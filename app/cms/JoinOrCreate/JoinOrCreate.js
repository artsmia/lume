import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import {Form, Label, Input, Select, Option} from '../../ui/forms'
import {Row, Column} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import router from 'next/router'

export default class JoinOrCreate extends Component {

  state = {
    organizations: [],
    name: "",
    subdomain: ""
  }

  render() {

    if (this.props.data.loading) return null

    const {
      createAndJoinOrg,
      joinOrg,
      change,
      props: {
        organizations
      },
      state: {
        organizationId,
        name,
        subdomain
      },
    } = this
    return (
        <Centered>
          <Row>

            <Column>
              <H2>Join an Organization</H2>

                <Form>

                  <Select
                    name={"organizationId"}
                    onChange={change}
                  >
                    <Option
                      key={"default"}
                      value={""}
                    >
                      Choose an Organization
                    </Option>
                    {organizations.map( ({id, name}) => (
                      <Option
                        key={id}
                        value={id}
                      >
                        {name}
                      </Option>
                    ))}


                  </Select>

                </Form>
                <Button
                  disabled={(!organizationId)}
                  onClick={joinOrg}
                >
                  Join
                </Button>

            </Column>
            <Column>
              <H2>...Or Create a New One</H2>
                <Form>
                  <Label>
                    Organization Name
                  </Label>
                  <Input
                    name={"name"}
                    type={"text"}
                    onChange={change}
                  />
                  <Label>
                    Subdomain
                  </Label>
                  <Input
                    name={"subdomain"}
                    type={"text"}
                    onChange={change}
                  />
                </Form>
                <Button
                  disabled={(!name || !subdomain)}
                  onClick={createAndJoinOrg}
                >
                  Create and Join
                </Button>
            </Column>


          </Row>


        </Centered>
    )
  }

  joinOrg = async() => {
    try {

      const {
        state: {
          organizationId,
        },
        props: {
          userId,
          joinOrganization
        }
      } = this

      const {data: {editOrCreateOrganization: {subdomain: orgSub}}} = await joinOrganization({
        variables: {
          orgId: organizationId,
          newUserIds: [userId],
        }
      })

      router.push({
        pathname: '/cms/org',
        query: {
          orgSub
        }
      }, `/${orgSub}/cms`)


    } catch (ex) {
      console.error(ex)
    }
  }


  change = ({target: {name, value}}) => this.setState({[name]: value})


  createAndJoinOrg = async () => {
    try {

      const {
        props: {
          userId,
          data: {
            organizations
          }
        },
        state: {
          name,
          subdomain,
        }
      } = this

      const {data: {editOrCreateOrganization: {subdomain: orgSub}}} = await this.props.addUserToOrganization({
        variables: {
          newUserIds: [userId],
          name,
          subdomain
        }
      })



      router.push({
        pathname: '/cms/org',
        query: {
          orgSub
        }
      }, `/${orgSub}/cms`)


    } catch (ex) {
      console.error(ex)
    }
  }


}

const Centered = styled.div`
  display: flex;
  width: 50%;
  margin: auto;
`
