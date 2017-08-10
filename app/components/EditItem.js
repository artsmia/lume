import React, {Component} from 'react'
import Template, {EditContainer, EditTabContainer} from '../ui/cms/Template'
import {H2} from '../ui/h'
import {Tab} from '../ui/buttons'
import {Form, Label, Input} from '../ui/forms'
import {Column} from '../ui/layout'
import {Button} from '../ui/buttons'
import apiFetch from '../utils/apiFetch'

export default class extends Component {

  inputs = ["title", "medium", "artist", "dated", "accessionNumber", "currentLocation", "creditLine", "text"]

  constructor(props){
    super(props)
    console.log(props)
    this.inputs.forEach( name => {
      this.state = {
        ...this.state,
        [name]: props.item[name] || ""
      }
    })
  }

  render() {
    const {
      state,
      inputs,
      change,
      saveItem
    } = this
    return (
      <Template>
        <EditTabContainer>
          <Tab>
            Edit
          </Tab>
          <Tab>
            Preview
          </Tab>
        </EditTabContainer>
        <EditContainer>
          <Form>
            {inputs.map( name => (
              <Column
                key={name}
              >
                <Label>
                  {name}
                </Label>
                <Input
                  name={name}
                  onChange={change}
                  value={state[name]}
                />
              </Column>
            ))}
          </Form>
          <Button
            onClick={saveItem}
          >
            Save Item
          </Button>
        </EditContainer>
      </Template>
    )
  }

  change = ({target: {name, value}}) => this.setState({[name]: value})

  saveItem = async () => {
    try {
      const {
        artist
      } = this.state
      const {
        organization: {
          id: orgId
        },
        item: {
          id
        }
      } = this.props


      await apiFetch(`
        mutation {
          editOrCreateItem(
            id: "${id}"
            artist: "${artist}"
          ) {
            id
          }
        }
      `)
    } catch (ex) {
      console.error(ex)
    }
  }

}
