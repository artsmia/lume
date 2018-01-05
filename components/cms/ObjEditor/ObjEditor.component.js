import React, {Component} from 'react'
import styled from 'styled-components'
import {Input, Textarea, Label} from '../../ui/forms'
import {Button} from '../../ui/buttons'


export default class ObjEditor extends Component {

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
      saveEdits,
      handleChange
    } = this


    return (
      <Container>
        <Button
          onClick={saveEdits}
        >
          Save
        </Button>
        <Label>
          Title
        </Label>
        <Input
          name={"title"}
          value={this.state.title}
          onChange={handleChange}
        />
      </Container>
    )
  }


  updateProps = (nextProps) => {
    if (
      nextProps.obj &&
      nextProps.objId !== this.state.id
    ){


      let {
        obj
      } = nextProps

      let newState

      Object.keys(obj).forEach( key => Object.assign(newState,{[key]: obj[key]}))

      this.setState(newState)
    }
  }


  saveEdits = () => {
    this.props.editObj({
      ...this.state,
    })
  }

  handleChange = ({target: {value, name}}) => {
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
