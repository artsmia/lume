import React, {Component} from 'react'
import styled from 'styled-components'
import contentConfig from '../../contents'
import {Input, Textarea, Label} from '../../ui/forms'
import {Button} from '../../ui/buttons'

export default class ContentEditor extends Component {

  state = {
    id: false,
    config: false
  }

  render(){

    if (!this.state.config) return null

    const {
      state:{
        config
      },
      renderEditors,
      saveEdits
    } = this

    return (
      <Container>
        <Button
          onClick={saveEdits}
        >
          Save
        </Button>
        {renderEditors()}
      </Container>
    )
  }

  renderEditors = () => {
    const {
      state,
      state:{
        config
      },
      handleChange
    } = this

    if (!config) return null

    return config.fields.map( ({name, cms}) => {

      let props = {
        name,
        value: state[name],
        onChange: handleChange
      }

      switch (cms.type) {
        case "input": {

          return (
            <div
              key={name}
            >
              <Label>
                {name}
              </Label>
              <Input
                {...props}
              />
            </div>
          )
        }
        case "textarea": {

          return (
            <div
              key={name}
            >
              <Label>
                {name}
              </Label>
              <Textarea
                {...props}
              />
            </div>
          )
        }
        default: {

          null
        }
      }
    })
  }

  saveEdits = () => {
    this.props.editContent(this.state)
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  componentWillReceiveProps(nextProps){
    if (
      nextProps.content &&
      nextProps.contentId !== this.state.id
    ){

      const {
        content,
        content: {
          type
        }
      } = nextProps

      let config = contentConfig[type]

      let newState = {
        config
      }

      if (config) {
        config.fields.forEach( field => Object.assign(newState, {
          [field.name]: content[field.name] || ""
        }))
      }


      this.setState(newState)
    }
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
