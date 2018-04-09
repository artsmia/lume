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
        p={2}
        flexWrap={'wrap'}

      >
        <Box
          w={1}
        >
          <H2>
            Associated Groups
          </H2>
        </Box>

          {categories.map( category => (
            <Flex
              key={category.id}
              w={1}
              flexWrap={'wrap'}
              pl={2}
            >
              <Box
                w={1}
              >
                <H3>
                  {category.title}
                </H3>
              </Box>

              <Flex
                w={1}
                flexWrap={'wrap'}
              >
                {category.groups.map( group => (
                  <Flex
                    key={group.id}
                    w={1}
                    justifyContent={'flex-start'}
                  >
                    <CheckboxInput
                      value={group.id}
                      checked={selectedGroupIds.includes(group.id)}
                      onChange={handleCheck}
                    />
                    <span>
                      {group.title}
                    </span>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          ))}
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
      },
      ()=>{

        this.props.editStory({
          setGroupsIds: this.state.selectedGroupIds
        })
      }
    )
  }

}

const Container = styled(Flex)`
  border: 1px solid ${({theme}) => theme.color.gray30};
  border-radius: 4px;
  min-height: 100px;
`
