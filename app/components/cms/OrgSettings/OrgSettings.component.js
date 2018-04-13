import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Form, Label, Input, Select, Option, CheckboxInput} from '../../mia-ui/forms'
import {Button} from '../../mia-ui/buttons'
import CategoryGroupEditor from '../CategoryGroupEditor'
import {Page, Card} from '../../mia-ui/layout'
import {Flex, Box} from 'grid-styled'
import ManageUsers from '../ManageUsers'

export default class OrgSettings extends Component {

  state = {
    name: "",
    newUsersRequireApproval: false,
    customObjApiEnabled: false,
    customObjApiEndpoint: ""
  }

  constructor(props){
    super(props)
    this.state = {
      ...props.organization
    }
  }


  render() {

    if (!this.props.organization) return null

    const {
      state: {
        name,
        newUsersRequireApproval,
        customObjApiEnabled,
        customObjApiEndpoint
      },
      handleChange,
      handleCheck,
      handleSave,
      props: {
        organization
      }
    } = this

    return (
        <Page>

          <Card>

            <H2>
              {organization.name} settings
            </H2>

            <Box
              w={1}
            >
              <Label>
                Name
              </Label>

              <Input
                name={"name"}
                value={name}
                onChange={handleChange}
              />

            </Box>

            <Box
              w={1}
            >
              <Label>
                New Users Require Approval
              </Label>

              <CheckboxInput
                name={"newUsersRequireApproval"}
                checked={newUsersRequireApproval}
                onChange={handleCheck}
              />
            </Box>

            <Box
              w={1}
            >
              <Label>
                Use Custom Object API
              </Label>

              <CheckboxInput
                name={"customObjApiEnabled"}
                checked={customObjApiEnabled}
                onChange={handleCheck}
              />
            </Box>

            <Box
              w={1}
            >
              <Label>
                Custom Object API Endpoint
              </Label>

              <Input
                name={"customObjApiEndpoint"}
                value={customObjApiEndpoint}
                onChange={handleChange}
              />
            </Box>


            <Box
              w={1}
            >
              <Button
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>


          </Card>

          <Card
            my={2}
          >
            <CategoryGroupEditor/>

          </Card>

          <Card
            my={2}
          >
            <ManageUsers/>

          </Card>


        </Page>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleCheck = ({target: {checked, name}}) => this.setState({[name]: checked})

  componentWillReceiveProps(nextProps){
    if (
      nextProps.organization
    ) {
      if (
        nextProps.organization.id !== this.state.organizationId
      ) {
        this.setState({...nextProps.organization})
      }
    }
  }

  handleSave = () => {

    this.props.editOrganization({
      ...this.state
    })
  }


}
