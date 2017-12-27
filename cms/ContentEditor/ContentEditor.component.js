import React, {Component} from 'react'
import styled from 'styled-components'
import editorConfig from '../../contents/editorConfig'
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
      props: {
        editContent,
        content
      },
      state,
      state:{
        config
      },
      handleChange
    } = this

    if (!config) return null

    return config.fields.map( ({
      label,
      graphqlType,
      arg,
      Component,
      position
    }) => {


      let props = {
        label,
        name: arg,
        value: state[arg],
        onChange: handleChange
      }

      if (
        graphqlType === "geometry"
      ) {
        props.imageId = state.image0Id
        props.geometry = state.geometry
      }

      return (
        <Component
          key={arg}
          {...props}
        />
      )
    })
  }

  updateProps = (nextProps) => {
    if (
      nextProps.content &&
      nextProps.contentId !== this.state.id
    ){


      let config = editorConfig[nextProps.content.type]
      let {
        content
      } = nextProps

      let newState = {
        config
      }

      if (config) {
        config.fields.forEach( field => {
          let value

          switch (field.graphqlType) {
            case "String": {
              value = content[field.arg] || ""
              break
            }
            case "image": {
              value = (content[field.parent]) ? content[field.parent].id : undefined
              break
            }
            default: {

              break
            }
          }


          Object.assign(newState, {
            [field.arg]: value
          })
        })
      }


      this.setState(newState)
    }
  }


  saveEdits = () => {
    this.props.editContent({
      ...this.state,
      config: undefined
    })
  }

  handleChange = ({target: {value, name}}) => {
    console.log(value, name)
    this.setState({[name]: value})
  }

  componentWillReceiveProps(nextProps){
    this.updateProps(nextProps)
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  overflow-y: scroll;
`
