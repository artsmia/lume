import React, {Component} from 'react'
import Template from '../CMSTemplate'
import {EditContainer, EditTabContainer} from '../CMSTemplate/Template'
import {H2} from '../../ui/h'
import {Tab} from '../../ui/buttons'
import {Form, Label, Input} from '../../ui/forms'
import {Column} from '../../ui/layout'
import {Button} from '../../ui/buttons'

export default class EditItem extends Component {

  inputs = ["title", "medium", "artist", "dated", "accessionNumber", "currentLocation", "creditLine", "text"]

  constructor(props){
    super(props)
    this.inputs.forEach( name => {
      this.state = {
        ...this.state,
        [name]: ""
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
      <Template
        {...this.props}
      >
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

  componentWillReceiveProps(newProps){
    this.inputs.forEach( name => {
      this.setState({
        [name]: newProps.data.item[name] || ""
      })
    })
  }

  change = ({target: {name, value}}) => this.setState({[name]: value})

  saveItem = async () => {
    try {
      const {
        state: {
          artist,
          title
        },
        props: {
          data: {
            item: {
              id: itemId
            }
          }
        }
      } = this

      const response = await this.props.editItem({
        variables: {
          itemId,
          artist,
          title
        }
      })

      console.log(response)

    } catch (ex) {
      console.error(ex)
    }
  }

}
