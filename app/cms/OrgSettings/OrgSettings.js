import React, {Component} from 'react'
import styled from 'styled-components'
import {Input, Label, Checkbox} from '../../ui/forms'
import {Button} from '../../ui/buttons'

export default class OrgSettings extends Component {


  state = {
    customObjApiEnabled: false,
    customObjApiEndpoint: ""
  }

  render() {

    if (this.props.data.loading) return null

    const {
      state: {
        customObjApiEnabled,
        customObjApiEndpoint
      },
      handleCheckboxChange,
      handleChange,
      handleSave
    } = this
    return (
      <Container>
        <Label>
          Enable Custom Obj API
        </Label>
        <Checkbox
          name={"customObjApiEnabled"}
          checked={customObjApiEnabled}
          onChange={handleCheckboxChange}
        />
        <Label>
          Custom Obj API Endpoint
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

      </Container>
    )
  }

  componentWillReceiveProps({data}) {
    let keys = Object.keys(data.organization)
    keys.forEach( key => this.setState({[key]: data.organization[key]}))
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleCheckboxChange = ({target: {checked, name}}) => this.setState({[name]: checked})

  handleSave = async () => {
    try {
      const {
        props: {
          editOrganization,
          data: {
            organization: {
              id: orgId
            }
          }
        },
        state: {
          customObjApiEnabled,
          customObjApiEndpoint
        }
      } = this


      await editOrganization({
        variables: {
          orgId,
          customObjApiEnabled,
          customObjApiEndpoint
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 50%;
  align-items: flex-start;
`
