import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../Template'
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
      addUserToOrganization,
      change,
      props,
      state: {
        organizations,
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
                  onClick={addUserToOrganization}
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
                  onClick={addUserToOrganization}
                >
                  Create and Join
                </Button>
            </Column>


          </Row>


        </Centered>
    )
  }

  componentWillReceiveProps(newProps){
    if (this.state.organizations.length === 0 && !newProps.data.loading){
      const {
        organizations
      } = this.props.data

      this.setState({organizations: organizations || []})
    }
  }

  change = ({target: {name, value}}) => this.setState({[name]: value})


  addUserToOrganization = async () => {
    try {

      const {
        props: {
          userId,
        },
        state: {
          name,
          subdomain,
          organizationId
        }
      } = this


      const {data: {editOrCreateOrganization: {subdomain: orgSub}}} = await this.props.addUserToOrganization({
        variables: {
          orgId: organizationId,
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
