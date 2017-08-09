import React, {Component} from 'react'
import Template, {Centered} from '../ui/cms/Template'
import {H2} from '../ui/h'
import {Form, Label, Input, Select, Option} from '../ui/forms'
import apiFetch from '../utils/apiFetch'
import {Row, Column} from '../ui/layout'
import {Button} from '../ui/buttons'
import router from 'next/router'

export default class extends Component {

  state = {
    organizations: [],
    organizationId: "",
    name: "",
    subdomain: ""
  }

  render() {
    const {
      addUserToOrganization,
      change,
      createAndJoinOrganization,
      state: {
        organizations,
        organizationId,
        name,
        subdomain
      },
    } = this
    return (
      <Template
        drawer={false}
      >
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
                  onClick={createAndJoinOrganization}
                >
                  Create and Join
                </Button>
            </Column>


          </Row>


        </Centered>
      </Template>
    )
  }

  componentDidMount(){
    this.getOrgs()
  }

  change = ({target: {name, value}}) => this.setState({[name]: value})

  getOrgs = async () => {
    try {
      const {allOrganizations: organizations} = await apiFetch(`{
        allOrganizations {
          id
          name
        }
      }`)

      this.setState({organizations})

    } catch (ex) {
      console.error(ex)
    }
  }

  addUserToOrganization = async () => {
    try {
      const {
        props: {
          userId
        },
        state: {
          organizationId
        }
      } = this

      if (!organizationId || !userId) {
        throw "Error"
      }

      await apiFetch(`
        mutation {
          addUserToOrganization(
            organizationId: "${organizationId}"
            userId: "${userId}"
          ) {
            id
          }
        }
      `)


    } catch (ex) {
      console.error(ex)
    }
  }

  createAndJoinOrganization = async () => {
    try {
      const {
        props: {
          userId
        },
        state: {
          name,
          subdomain
        }
      } = this

      if (!name || !subdomain) {
        throw "error"
      }

      const {
        editOrCreateOrganization: {
          id: organizationId
        }
      } = await apiFetch(`
        mutation {
          editOrCreateOrganization(
            name: "${name}"
            subdomain: "${subdomain}"
          ) {
            id
          }
        }
      `)

      if (!organizationId || !userId) {
        throw "error"
      }

      await apiFetch(`
        mutation {
          addUserToOrganization(
            organizationId: "${organizationId}"
            userId: "${userId}"
          ) {
            id
          }
        }
      `)

    } catch (ex) {
      console.error(ex)
    }
  }


}
