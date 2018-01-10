import React, {Component} from 'react'
import styled from 'styled-components'
import {Input, Textarea, ChangeImage} from '../DefaultEditors'
import {Button} from '../../ui/buttons'


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
    primaryImageId: undefined
  }

  state = {
    ...this.initialState
  }


  render(){

    const {
      state,
      handleChange,
      handleSave
    } = this

    return (
      <Container>
        <Button
          onClick={handleSave}
        >
          Save Obj
        </Button>
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
        <Textarea
          label={"Description"}
          name={'description'}
          value={state.description}
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


  handleChange = ({target: {value, name}}) => {
    this.setState({[name]: value})
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
  overflow-y: scroll;
`
