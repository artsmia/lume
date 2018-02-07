import React, {Component} from 'react'
import styled from 'styled-components'
import {Button, RoundButton} from '../../ui/buttons'
import CategoryEditor from '../CategoryEditor'
import Icon from '../../ui/icons'
import {H2} from '../../ui/h'

export default class CategoryGroupEditor extends Component {

  render() {

    if (!this.props.organization) return null

    const {
      props: {
        organization: {
          categories
        },
      },
      handleCreate
    } = this

    return (
      <Container>
        <H2>
          Edit/Create Categories and Groups
        </H2>
        {categories.map( category => (
          <CategoryEditor
            key={category.id}
            categoryId={category.id}
          />
        ))}
        <RoundButton
          onClick={handleCreate}
          title={"Create Category"}
          size={"50px"}
          color={"green"}
        >
          <Icon
            color={"white"}
            icon={"add"}
          />
        </RoundButton>

      </Container>
    )
  }

  handleCreate = async () => {
    try {
      await this.props.createCategory()

      this.props.showSnack({
        message: "Category Created"
      })
    } catch (ex) {
      console.error(ex)
    }
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  margin: 20px 0;
  border: 1px solid grey;
  padding: 10px;
`
