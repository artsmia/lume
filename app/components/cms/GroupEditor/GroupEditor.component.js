import React, {Component} from 'react'
import styled from 'styled-components'
import {Button, RoundButton} from '../../ui/buttons'
import {Input, Textarea, Label} from '../../ui/forms'
import Icon from '../../ui/icons'

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
        <DeleteButton
          onClick={deleteGroup}
          title={"Delete Group"}
          color={"red"}
          size={"40px"}
        >
          <Icon
            color={"white"}
            icon={"close"}
          />
        </DeleteButton>
        <Input
          name={"title"}
          value={title}
          onChange={handleChange}
          placeholder={"Title"}
        />
        <Textarea
          name={"description"}
          value={description}
          onChange={handleChange}
          placeholder={"Description"}
        />




      </Container>
    )
  }

  handleSave = () => {
    this.props.editGroup({
      ...this.state
    })
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  bounce = true

  debounce = (func, time) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        time
      )
    }
  }

  handleChange = ({target: {value, name}}) => {
    this.setState(
      () => ({[name]: value}),
      () => {
        this.debounce(
          this.handleSave,
          1000
        )
      }
    )
  }


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
  width: 100%;
  border: 1px solid grey;
  margin: 10px 0;
`

const DeleteButton = styled(RoundButton)`
  align-self: flex-end;
  position: absolute;
`
