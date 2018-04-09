import React, {Component} from 'react'
import styled from 'styled-components'
import {Button, RoundButton} from '../../mia-ui/buttons'
import {Input, Textarea, Label} from '../../mia-ui/forms'
import {Icon} from '../../mia-ui/icons'
import {Flex, Box} from 'grid-styled'

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
      <Flex
        flexWrap={'wrap'}
        w={1}
      >
        <Flex
          w={1}
          justifyContent={'space-between'}
        >
          <Input
            name={"title"}
            value={title}
            onChange={handleChange}
            placeholder={"Title"}
          />
          <Button
            onClick={deleteGroup}
            title={"Delete Group"}
            color={"red"}
          >
            Delete Group
          </Button>
        </Flex>


        <Textarea
          name={"description"}
          value={description}
          onChange={handleChange}
          placeholder={"Description"}
        />




      </Flex>
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
