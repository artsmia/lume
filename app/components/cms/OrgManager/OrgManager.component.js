import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Form, Label, Input, Select, Option} from '../../mia-ui/forms'
import {Button} from '../../mia-ui/buttons'
import router from 'next/router'
import {Page, Card} from '../../mia-ui/layout'

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
        <Page>

            <Card
              m={2}
            >
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

            </Card>
            <Card
              m={2}
            >
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
            </Card>


        </Page>
    )
  }

  joinOrg = async() => {
    try {

      const {
        state: {
          organizationId,
        },
        props: {
          user: {
            id: userId
          },
          joinOrganization
        }
      } = this

      console.log(this.props.organizations)

      const {newUsersRequireApproval} = this.props.organizations.find(org => org.id === organizationId)

      console.log(newUsersRequireApproval)


      const {data: {editUserOrganizationRole: {organizations}}} = await joinOrganization({
        variables: {
          organizationId,
          userId,
          role: newUsersRequireApproval ? 'pending': 'contributor'
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
        window.alert("Your request was sent")
        router.push('/')
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
          user: {
            id: userId
          },
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
