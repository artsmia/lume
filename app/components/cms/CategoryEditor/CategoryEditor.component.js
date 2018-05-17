import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from '../../mia-ui/buttons'
import { Input, Textarea, Label } from '../../mia-ui/forms'
import GroupEditor from '../GroupEditor'
import { Icon } from '../../mia-ui/icons'
import { Expander } from '../../mia-ui/expanders'
import { Flex, Box } from 'grid-styled'

export default class CategoryEditor extends Component {
  state = {
    ...this.props.category,
    expander: false
  }

  render() {
    if (!this.props.category) return null

    const {
      props: {
        category,
        category: { groups },
        deleteCategory,
        createGroup
      },
      state: { title, description, expander },
      handleChange
    } = this

    return (
      <Expander
        header={
          <Flex w={1} justifyContent={'space-between'}>
            <Input
              name={'title'}
              value={title}
              onChange={handleChange}
              placeholder={'Category Title'}
            />

            <Button
              round
              size={'40px'}
              color={'red'}
              onClick={deleteCategory}
              title={'Delete Category'}
            >
              <Icon color={'white'} icon={'clear'} />
            </Button>
          </Flex>
        }
        open={expander}
        onRequestOpen={() => this.setState({ expander: true })}
        onRequestClose={() => this.setState({ expander: false })}
      >
        <Flex w={1} flexWrap={'wrap'} pl={5} py={3}>
          {groups.map(group => (
            <Box w={1} key={group.id} my={2}>
              <GroupEditor groupId={group.id} />
            </Box>
          ))}
          <Box w={1}>
            <Button
              round
              color={'green'}
              onClick={createGroup}
              title={'Create Group'}
            >
              <Icon color={'white'} icon={'add'} />
            </Button>
          </Box>
        </Flex>
      </Expander>
    )
  }

  bounce = true

  debounce = (func, time) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(func, time)
    }
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState(
      () => ({ [name]: value }),
      () => {
        this.debounce(() => {
          this.props.editCategory({
            ...this.state
          })
        }, 1000)
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category) {
      if (nextProps.category.id !== this.state.id) {
        this.setState({
          ...nextProps.category
        })
      }
    }
  }
}
