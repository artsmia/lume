import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import {Form, Label, Input, Select, Option} from '../../ui/forms'
import {Row, Column} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import router from 'next/router'

export default class OrgManager extends Component {

  static defaultProps = {
    organizations: []
  }

  state = {
    organizations: [],
    name: "",
    subdomain: ""
  }

  render() {


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

      const {data: {editUserOrganization: {organizations}}} = await joinOrganization({
        variables: {
          organizationId,
          userId,
        }
      })

      let organization = organizations.find( org => org.id === organizationId)

      if (
        organization.role &&
        organization.role !== "pending"
      ) {
        router.push({
          pathname: '/cms',
          query: {
            subdomain: organization.subdomain
          }
        }, `/${organization.subdomain}/cms`)
      } else {
        window.alert("your request was sent")
      }




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
          createOrganization,
        },
        state: {
          name,
          subdomain,
        }
      } = this

      const {data: {createOrganization: organization}} = await createOrganization({
        variables: {
          name,
          subdomain,
          creatorId: userId
        }
      })

      if(organization) {
        router.push({
          pathname: '/cms',
          query: {
            subdomain: organization.subdomain
          }
        }, `/${organization.subdomain}/cms`)
      }


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
