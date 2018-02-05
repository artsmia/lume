import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import {Input, Textarea, Label} from '../../ui/forms'
import GroupEditor from '../GroupEditor'

export default class CategoryEditor extends Component {

  state = {
    ...this.props.category
  }

  render() {

    if (!this.props.category) return null

    const {
      props: {
        category,
        category: {
          groups
        },
        deleteCategory,
        createGroup
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
          onClick={deleteCategory}
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

        {groups.map( group => (
          <GroupEditor
            groupId={group.id}
            key={group.id}
          />
        ))}
        <Button
          onClick={createGroup}
        >
          New Group
        </Button>

      </Container>
    )
  }

  handleSave = () => {
    this.props.editCategory({
      ...this.state
    })
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  componentWillReceiveProps(nextProps){
    if (nextProps.category.id !== this.state.id){
      this.setState({
        ...nextProps.category
      })
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 2px solid lightblue;
  width: 100%;
`
