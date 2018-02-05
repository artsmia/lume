import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import CategoryEditor from '../CategoryEditor'

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
        <Button
          onClick={createCategory}
        >
          New Category
        </Button>
        {categories.map( category => (
          <CategoryEditor
            key={category.id}
            categoryId={category.id}
          />
        ))}

      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 2px solid salmon;
  width: 100%;
`
