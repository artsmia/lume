import React, {Component} from 'react'
import styled from 'styled-components'
import {Modal} from '../../mia-ui/modals'
import {Button} from '../../mia-ui/buttons'
import {CheckboxInput} from '../../mia-ui/forms'
import {H3, H2} from '../../mia-ui/text'
import {Flex, Box} from 'grid-styled'

export default class StoryGroupSelector extends Component {

  state = {
    modal: false,
    selectedGroupIds: this.props.selectedGroupIds
  }

  render() {

    if (!this.props.organization) return null

    const {
      state: {
        modal,
        selectedGroupIds
      },
      props: {
        organization: {
          categories
        },
      },
      handleCheck,
      handleClose
    } = this

    return (
      <Container
        my={2}
        p={1}
      >
        <H2>
          Associated Groups
        </H2>
          <div>
            {categories.map( category => (
              <div
                key={category.id}
              >
                <H3>
                  {category.title}
                </H3>
                <div>
                  {category.groups.map( group => (
                    <div
                      key={group.id}
                    >
                      <CheckboxInput
                        value={group.id}
                        checked={selectedGroupIds.includes(group.id)}
                        onChange={handleCheck}
                      />
                      <div>
                        {group.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </Container>
    )
  }

  handleCheck = ({target: {value}}) => {
    this.setState(
      ({selectedGroupIds})=> {
        let selected = selectedGroupIds.slice()
        if (selected.includes(value)){
          selected = selected.filter(id => id !== value)
          return {
            selectedGroupIds: selected
          }
        } else {
          selected.push(value)
          return {
            selectedGroupIds: selected
          }
        }
      }
    )
  }

}

const Container = styled(Flex)`
  border: 1px solid ${({theme}) => theme.color.gray30};
  border-radius: 4px;
  min-height: 100px;
`
