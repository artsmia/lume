import React, {Component} from 'react'
import styled from 'styled-components'
import {Input, Label, Checkbox} from '../../ui/forms'
import {Button} from '../../ui/buttons'

export default class OrgSettings extends Component {


  state = {
    customItemApiEnabled: false,
    customItemApiEndpoint: ""
  }

  render() {

    if (this.props.data.loading) return null

    const {
      state: {
        customItemApiEnabled,
        customItemApiEndpoint
      },
      handleCheckboxChange,
      handleChange,
      handleSave
    } = this
    return (
      <Container>
        <Label>
          Enable Custom Item API
        </Label>
        <Checkbox
          name={"customItemApiEnabled"}
          checked={customItemApiEnabled}
          onChange={handleCheckboxChange}
        />
        <Label>
          Custom Item API Endpoint
        </Label>
        <Input
          name={"customItemApiEndpoint"}
          value={customItemApiEndpoint}
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
          customItemApiEnabled,
          customItemApiEndpoint
        }
      } = this


      await editOrganization({
        variables: {
          orgId,
          customItemApiEnabled,
          customItemApiEndpoint
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
