import React, {Component} from 'react'
import styled from 'styled-components'
import {Input, Textarea, ChangeImage} from '../DefaultEditors'
import {Button} from '../../ui/buttons'
import {Checkbox, Input as SimpleInput, Label} from '../../ui/forms'
import {Row} from '../../ui/layout'

export default class ObjEditor extends Component {

  initialState = {
    id: "",
    title: "",
    description: "",
    attribution: "",
    date: "",
    accessionNumber: "",
    medium: "",
    dimensions: "",
    currentLocation: "",
    creditLine: "",
    pullFromCustomApi: false,
    primaryImageId: undefined,
    localId: ""
  }

  state = {
    ...this.initialState
  }


  render(){

    const {
      state,
      handleChange,
      handleSave,
      handleCheck
    } = this

    return (
      <Container>
        <Button
          onClick={handleSave}
        >
          Save Obj
        </Button>

        <div>
          <Label>
            Pull From Custom API
          </Label>
          <Checkbox
            name={"pullFromCustomApi"}
            checked={state.pullFromCustomApi}
            onChange={handleCheck}
          />
        </div>
        <div>
          <Label>
            Local ID
          </Label>
          <SimpleInput
            placeholder={"Local ID"}
            name={"localId"}
            value={state.localId}
            onChange={handleChange}
          />
        </div>
        <Input
          label={"Title"}
          name={'title'}
          value={state.title}
          onChange={handleChange}
        />
        <Input
          label={"Attribution"}
          name={'attribution'}
          value={state.attribution}
          onChange={handleChange}
        />
        <Input
          label={"Date"}
          name={'date'}
          value={state.date}
          onChange={handleChange}
        />


        <ChangeImage
          label={"Image"}
          name={'primaryImageId'}
          value={state.primaryImageId}
          onChange={handleChange}
        />
      </Container>
    )
  }


  handleChange = ({target: {value, name, checked}}) => {
    this.setState({[name]: value})
  }

  handleCheck = ({target: {name, checked}}) => {
    this.setState({[name]: checked})
  }

  handleSave = () => {
    this.props.editObj({
      ...this.state,
      __typename: undefined
    })
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.obj){
      if (nextProps.obj.id !== this.state.id) {
        let {obj} = nextProps
        let state = {}
        Object.keys(obj).forEach( key => {
          Object.assign(state,{
            [key]: obj[key] || this.initialState[key]
          })
        })
        this.setState(state)
      }
    }
  }

}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  border: 1px solid grey;
  min-height: 500px;
`
