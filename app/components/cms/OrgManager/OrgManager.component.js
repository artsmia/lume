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
    subdomain: "",
    subdomainValid: false,
    subdomainInvalid: false
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
        subdomain,
        subdomainErrorMsg,
        subdomainValid,
        subdomainInvalid
      },
      handleAdd,
      handleRemove,
      handleSubdomainChange
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
                    valid={(name)}
                    value={name}
                  />
                  <Label>
                    Subdomain
                  </Label>
                  <Input
                    name={"subdomain"}
                    type={"text"}
                    onChange={handleSubdomainChange}
                    valid={subdomainValid}
                    invalid={subdomainInvalid}
                    errorMsg={subdomainErrorMsg}
                    value={subdomain}
                  />
                </Form>
                <Button
                  disabled={(!name || !subdomain || subdomainInvalid || !subdomainValid)}
                  onClick={createAndJoinOrg}
                >
                  Create and Join
                </Button>
            </Card>


        </Page>
    )
  }

  handleSubdomainChange = ({target: {name, value}}) => {
    let invalidSubdomains = ['login', 'logout', 'callback', 'error', 'auth', 'organizations', 'cms']

    this.props.organizations.forEach(org => invalidSubdomains.push(org.subdomain))

    let subdomainValid = true
    let subdomainInvalid = false

    let subdomainErrorMsg = ""

    let newValue = value

    newValue = newValue.trim().replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()

    if (newValue.length > 20){
      subdomainValid = false
      subdomainInvalid = true
      subdomainErrorMsg = 'Subdomain must be less than 20 characters.'
    }

    if (newValue.length < 5){
      subdomainValid = false
      subdomainInvalid = true
      subdomainErrorMsg = 'Subdomain must be at least 5 characters.'
    }

    if (invalidSubdomains.includes(newValue)){
      subdomainValid = false
      subdomainInvalid = true
      subdomainErrorMsg = 'That subdomain is already taken.'

    }

    console.log(newValue)


    this.setState({
      [name]: newValue,
      subdomainValid,
      subdomainInvalid,
      subdomainErrorMsg
    })

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
