import React, {Component} from 'react'
import styled from 'styled-components'
import contentConfig from '../../contents'
import {Input, Textarea, Label} from '../../ui/forms'
import {Button} from '../../ui/buttons'
import ChangeImage from '../ChangeImage'
export default class ContentEditor extends Component {

  state = {
    id: false,
    config: false
  }

  render(){

    console.log(this.props)

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
      props: {
        editContent
      },
      state,
      state:{
        config
      },
      handleChange
    } = this

    if (!config) return null

    return config.fields.map( (field) => {

      const {
        name,
        cms
      } = field

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
        case "image": {

          return (
            <ChangeImage
              key={name}
              imageId={state[`${name}Id`]}
              onImageSave={(imageId) => {
                editContent({
                  [`${name}Id`]: imageId
                })
              }}
            />
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
        config.fields.forEach( field => {

          let key
          let value

          switch (field.graphql.type) {
            case "String": {
              key = field.name
              value = content[key] || ""
              break
            }
            case "image": {
              key = `${field.name}Id`
              value = (content[field.name]) ? content[field.name]["id"] : ""
              break
            }
            default: {

              break
            }
          }

          Object.assign(newState, {
            [key]: value
          })
        })
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
