import React, {Component} from 'react'
import styled from 'styled-components'
import {Button, RoundButton} from '../../ui/buttons'
import CategoryEditor from '../CategoryEditor'
import Icon from '../../ui/icons'

export default class CategoryGroupEditor extends Component {

  render() {

    if (!this.props.organization) return null

    const {
      props: {
        organization: {
          categories
        },
        createCategory
      }
    } = this

    return (
      <Container>
        {categories.map( category => (
          <CategoryEditor
            key={category.id}
            categoryId={category.id}
          />
        ))}
        <RoundButton
          onClick={createCategory}
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
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
`
