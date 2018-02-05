import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import {Input, Textarea, Label} from '../../ui/forms'

export default class GroupEditor extends Component {

  state = {
    ...this.props.group
  }

  render() {

    if (!this.props.group) return null

    const {
      props: {
        group,
        deleteGroup,
      },
      state: {
        title,
        description
      },
      handleChange,
      handleSave
    } = this

    return (
      <Container>
        <Button
          color={"red"}
          onClick={deleteGroup}
        >
          Delete
        </Button>
        <Label>
          Title
        </Label>
        <Input
          name={"title"}
          value={title}
          onChange={handleChange}
        />
        <Label>
          Description
        </Label>
        <Textarea
          name={"description"}
          value={description}
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

  handleSave = () => {
    this.props.editGroup({
      ...this.state
    })
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  componentWillReceiveProps(nextProps){
    if (nextProps.group.id !== this.state.id){
      this.setState({
        ...nextProps.group
      })
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 2px solid lightgreen;
  width: 50%;
`
