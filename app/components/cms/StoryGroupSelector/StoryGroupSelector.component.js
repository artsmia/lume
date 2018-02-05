import React, {Component} from 'react'
import styled from 'styled-components'
import Modal from '../../ui/modal'
import {Button} from '../../ui/buttons'
import {Row, Column} from '../../ui/layout'
import {Checkbox} from '../../ui/forms'
import {H3} from '../../ui/h'

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
      <Container>
        <Button
          onClick={()=>this.setState({modal: true})}
        >
          Select Groups
        </Button>
        <Modal
          open={modal}
          onClose={handleClose}
        >
          <Column>
            {categories.map( category => (
              <Column
                key={category.id}
              >
                <H3>
                  {category.title}
                </H3>
                <Column>
                  {category.groups.map( group => (
                    <Row
                      key={group.id}
                    >
                      <Checkbox
                        value={group.id}
                        checked={selectedGroupIds.includes(group.id)}
                        onChange={handleCheck}
                      />
                      <div>
                        {group.title}
                      </div>
                    </Row>
                  ))}
                </Column>
              </Column>
            ))}
          </Column>
        </Modal>
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

  handleClose = () => {
    this.setState({modal: false})
    this.props.onGroupSelectionSave(this.state.selectedGroupIds)
  }
}

const Container = styled.div`

`
