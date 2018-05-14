import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Form, Label, Input, Select, Option, MultiSelect} from '../../mia-ui/forms'
import {Button} from '../../mia-ui/buttons'
import router from 'next/router'
import {Page, Card} from '../../mia-ui/layout'
import Head from '../../shared/head'
import Joyride from 'react-joyride'
import {Flex, Box} from 'grid-styled'

export default class OrgManager extends Component {

  static defaultProps = {
    organizations: []
  }

  state = {
    organizations: [],
    name: "",
    subdomain: "",
    subdomainValid: false,
    subdomainInvalid: false,
    showTutorial: this.props.tutorial ? true : false,
    tutorial: [
      {
        content: (
          <div>
            <h2>Welcome to Lume!</h2>
            <p>First thing: Let's get you set up with an organization!</p>
          </div>
        ),
        placement: "center",
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: "body"
      },
      {
        content: (
          <div>
            <p>All users on Lume are organized into organizations. An organization might be a museum, a class project, or just a group of story tellers who want to collaborate.</p>
            <p>Organization members can share images and edit each others' stories. All of the stories that they've published will appear together on their organization's public page.</p>
          </div>
        ),
        placement: "center",
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: "body"
      },
      {
        target: "#join-org",
        content:(
          <div>
            <p>You can join an organization by searching for the organization by name and then selecting it from the dropdown menu. </p>
            <p>Note: some organizations require approval for new users or only allow users with organization specific email addresses. If you join such an organization, the admins will be notified of your join request and you will have to wait for their approval.</p>
          </div>
        )
      },
      {
        target: "#create-org",
        content:(
          <div>
            <p>You can also create your own organization by entering a name and subdomain here.</p>
          </div>
        )
      },
      {
        target: "#subdomain",
        content:(
          <div>
            <p>Each organization is given its own unique url at https://lume.space/~subdomain~</p>
            <p>Choose your subdomain wisely as this value can't currently be changed!</p>
          </div>
        )
      },
    ]
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
              id={'join-org'}
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
              id={"create-org"}
            >
              <H2>Create a New Organization</H2>
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
                  <Flex
                    id={'subdomain'}
                    w={1}
                  >

                    <Flex
                      w={1}
                    >
                      <UrlSpan>https://lume.space/</UrlSpan>
                      <Input
                        name={"subdomain"}
                        type={"text"}
                        onChange={handleSubdomainChange}
                        valid={subdomainValid}
                        invalid={subdomainInvalid}
                        errorMsg={subdomainErrorMsg}
                        value={subdomain}
                        paddingLeft={'160px'}
                      />
                    </Flex>

                  </Flex>

                </Form>
                <Button
                  disabled={(!name || !subdomain || subdomainInvalid || !subdomainValid)}
                  onClick={createAndJoinOrg}
                >
                  Create and Join
                </Button>
            </Card>

          <Joyride
            run={this.state.showTutorial}
            steps={this.state.tutorial}
            showProgress
            showSkipButton
            continuous
          />
        </Page>
    )
  }

  // componentDidMount(){
  //   this.props.addTips({
  //     tips: this.state.tutorial
  //   })
  // }
  //
  // componentWillUnmount(){
  //   this.props.removeTips({
  //     tips: this.state.tutorial
  //   })
  // }

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
            subdomain: organization.subdomain,
            tutorial: (organizations.length === 1) ? true : false
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

  componentDidMount(){
    if (this.props.user) {
      if (this.props.user.organizations.length < 1){
        this.setState({showTutorial: true})
      }
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
            subdomain: organization.subdomain,
            tutorial: (this.props.user.organizations.length < 1) ? true : false
          }
        }, `/cms/${organization.subdomain}`)
      }


    } catch (ex) {
      console.error(ex)
    }
  }


}

const UrlSpan = styled.span`
  position: absolute;
  font-size: 1rem;
  margin-top: 12.4px;
  margin-left: 14px;
  font-family: ${({theme}) => theme.font.bold};
  color: ${({theme}) => theme.color.gray60};
`

const Centered = styled.div`
  display: flex;
  width: 50%;
  margin: auto;
`
