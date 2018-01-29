import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import {Form, Label, Input, Select, Option, Checkbox} from '../../ui/forms'
import {Row, Column} from '../../ui/layout'
import {Button} from '../../ui/buttons'

export default class OrgSettings extends Component {

  state = {
    name: "",
    newUsersRequireApproval: false,
    customObjApiEnabled: false,
    customObjApiEndpoint: ""
  }


  render() {

    const {
      state: {
        name,
        newUsersRequireApproval,
        customObjApiEnabled,
        customObjApiEndpoint
      },
      handleChange,
      handleCheck,
      props: {
        organization
      }
    } = this

    console.log(this.props)

    return (
        <Centered>

          <Column>

            {/* <H2>
              {organization.name}
            </H2> */}

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
              value={newUsersRequireApproval}
              onChange={handleCheck}
            />

            <Label>
              Use Custom Object API
            </Label>

            <Checkbox
              name={"customObjApiEnabled"}
              value={customObjApiEnabled}
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


          </Column>


        </Centered>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleCheck = ({target: {checked, name}}) => this.setState({[name]: checked})

}

const Centered = styled.div`
  display: flex;
  width: 50%;
  margin: auto;
`
