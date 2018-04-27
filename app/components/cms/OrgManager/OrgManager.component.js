import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Form, Label, Input, Select, Option, MultiSelect} from '../../mia-ui/forms'
import {Button} from '../../mia-ui/buttons'
import router from 'next/router'
import {Page, Card} from '../../mia-ui/layout'
import Head from '../../shared/head'

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
      handleAdd,
      handleRemove
    } = this

    let selections = []

    if (organizationId) {
      let selection = organizations.find(({id}) => id === organizationId)
      selections.push({
        value: selection.id,
        name: selection.name
      })
    }

    return (
        <Page>

          <Head
            title={'Join or Create an Organization'}
          />

            <Card
              m={2}
            >
              <H2>Join an Organization</H2>

                <Form>

                  <MultiSelect
                    selections={selections}
                    options={organizations.map(({id, name}) =>({name, value: id}))}
                    onSearchChange={(e)=>console.log(e)}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                  />

                  {/* <Select
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


                  </Select> */}

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

  handleAdd = (organizationId) => {
    this.setState({organizationId})
  }

  handleRemove = (organizationId) => {
    this.setState({organizationId: ''})
  }

  joinOrg = async() => {
    try {

      const {
        state: {
          organizationId,
        },
        props: {
          user,
          user: {
            id: userId
          },
          joinOrganization
        }
      } = this


      const {
        newUsersRequireApproval,
        emailDomain
      } = this.props.organizations.find(org => org.id === organizationId)


      let role = "pending"

      if (
        !newUsersRequireApproval ||
        user.email.split('@')[1] === emailDomain
      ){
        role = "contributor"
      }

      const {data: {editUserOrganizationRole: {organizations}}} = await joinOrganization({
        variables: {
          organizationId,
          userId,
          role
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
        }, `/cms/${organization.subdomain}`)
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
        }, `/cms/${organization.subdomain}`)
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
