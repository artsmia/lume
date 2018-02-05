import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import {Form, Label, Input, Select, Option, Checkbox} from '../../ui/forms'
import {Row, Column} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import CategoryGroupEditor from '../CategoryGroupEditor'

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
        <Centered>

          <Column>

            <H2>
              {organization.name}
            </H2>

            <Label>
              Name
            </Label>

            <Input
              name={"name"}
              value={name}
              onChange={handleChange}
            />


            <Label>
              New Users Require Approval
            </Label>

            <Checkbox
              name={"newUsersRequireApproval"}
              checked={newUsersRequireApproval}
              onChange={handleCheck}
            />

            <Label>
              Use Custom Object API
            </Label>

            <Checkbox
              name={"customObjApiEnabled"}
              checked={customObjApiEnabled}
              onChange={handleCheck}
            />

            <Label>
              Custom Object API Endpoint
            </Label>

            <Input
              name={"customObjApiEndpoint"}
              value={customObjApiEndpoint}
              onChange={handleChange}
            />

            <Button
              onClick={handleSave}
            >
              Save
            </Button>

            <CategoryGroupEditor/>

          </Column>



        </Centered>
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

const Centered = styled.div`
  display: flex;
  width: 50%;
  margin: auto;
`
