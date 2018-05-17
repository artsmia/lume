import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, RoundButton } from '../../mia-ui/buttons'
import CategoryEditor from '../CategoryEditor'
import { Icon } from '../../mia-ui/icons'
import { H2 } from '../../mia-ui/text'
import { Page, Card } from '../../mia-ui/layout'
import { Flex, Box } from 'grid-styled'

export default class CategoryGroupEditor extends Component {
  render() {
    if (!this.props.organization) return null

    const {
      props: {
        organization: { categories }
      },
      handleCreate
    } = this

    return (
      <Flex flexDirection="column" p={1}>
        <Box my={2}>
          <H2>Edit/Create Categories and Groups</H2>
        </Box>

        {categories.map(category => (
          <CategoryEditor key={category.id} categoryId={category.id} />
        ))}
        <Box>
          <Button
            round
            onClick={handleCreate}
            title={'Create Category'}
            color={'green'}
          >
            <Icon color={'white'} icon={'add'} />
          </Button>
        </Box>
      </Flex>
    )
  }

  handleCreate = async () => {
    try {
      await this.props.createCategory()

      this.props.showSnack({
        message: 'Category Created'
      })
    } catch (ex) {
      console.error(ex)
    }
  }
}
