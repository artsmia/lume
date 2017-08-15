import React, {Component} from 'react'
import { gql, graphql, compose } from 'react-apollo'
import Template, {Centered} from './CMSTemplate'
import {H2} from '../ui/h'
import {Form, Label, Input, Select, Option} from '../ui/forms'
import {Row, Column} from '../ui/layout'
import {Button} from '../ui/buttons'
import router from 'next/router'

class JoinOrCreate extends Component {

  state = {
    organizations: [],
    name: "",
    subdomain: ""
  }

  render() {
    const {
      addUserToOrganization,
      change,
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
                  onClick={addUserToOrganization}
                >
                  Create and Join
                </Button>
            </Column>


          </Row>


        </Centered>
      </Template>
    )
  }

  componentWillReceiveProps(newProps){
    if (this.state.organizations.length === 0 && !newProps.data.loading){
      const {
        organizations
      } = this.props.data

      this.setState({organizations})
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

const organizations = gql`
  query organizations {
    organizations {
      id
      name
      subdomain
    }
  }
`

const addUserToOrganization = gql`
  mutation editOrCreateOrganization (
    $orgId: ID
    $newUserIds: [ID]
    $name: String
    $subdomain: String
  ) {
    editOrCreateOrganization (
      id: $orgId
      newUserIds: $newUserIds
      name: $name
      subdomain: $subdomain
    ) {
      id
      name
      subdomain
    }
  }
`

export default compose(
  graphql(organizations),
  graphql(addUserToOrganization, {
    name: "addUserToOrganization",
  })
)(
  JoinOrCreate
)
