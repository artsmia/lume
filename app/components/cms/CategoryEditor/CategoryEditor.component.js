import React, {Component} from 'react'
import styled from 'styled-components'
import {Button, RoundButton} from '../../ui/buttons'
import {Input, Textarea, Label} from '../../ui/forms'
import GroupEditor from '../GroupEditor'
import Icon from '../../ui/icons'

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
    } = this

    return (
      <Container>
        <DeleteButton
          size={"40px"}
          color={"red"}
          onClick={deleteCategory}
          title={"Delete Category"}
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
          placeholder={"Category Title"}
        />

        <GroupColumn>
          {groups.map( group => (
            <GroupEditor
              groupId={group.id}
              key={group.id}
            />
          ))}
          <RoundButton
            color={"green"}
            onClick={createGroup}
            title={"Create Group"}
            size={"50px"}
          >
            <Icon
              color={"white"}
              icon={"add"}
            />
          </RoundButton>
        </GroupColumn>



      </Container>
    )
  }

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
          ()=> {
            this.props.editCategory({
              ...this.state
            })
          },
          1000
        )
      }
    )
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.category.id !== this.state.id){
      this.setState({
        ...nextProps.category
      })
    }
  }
}

const DeleteButton = styled(RoundButton)`
  position: absolute;
  align-self: flex-end;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 20px 0;
  border: 1px solid black;
  padding: 10px;
  box-sizing: border-box;
`

const GroupColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid grey;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin: 10px 0;
`
