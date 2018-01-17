import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import Modal from '../../ui/modal'
import {Row, Column} from '../../ui/layout'
import {H4} from '../../ui/h'
import {Search} from '../../ui/search'
import {Checkbox} from '../../ui/forms'

export default class StoryAssociator extends Component {

  static defaultProps = {
    stories: [],
    story: {
      relatedStories: []
    }
  }

  state = {
    modal: false,
    search: ""
  }

  render() {
    const {
      state: {
        search
      },
      props: {
        stories,
        story: {
          relatedStories
        }
      },
      handleChange
    } = this
    return (
      <Container>
        <Button
          onClick={()=>this.setState({modal: true})}
        >
          Edit Related Stories
        </Button>

        <Modal
          open={this.state.modal}
          onClose={()=>this.setState({modal: false})}
        >
          <Search
            value={search}
            name={"search"}
            onChange={handleChange}
          />
          <Row>
            <Column>
              <H4>
                All Stories
              </H4>
              {stories.map( story => (
                <Row>
                  <Checkbox

                  />
                  {story.title}
                </Row>
              ))}
            </Column>
            <Column>
              <H4>
                Current Associations
              </H4>
              {relatedStories.map( story => (
                <Row>
                  <Checkbox

                  />
                  {story.title}
                </Row>
              ))}
            </Column>
          </Row>
        </Modal>

      </Container>
    )
  }

  handleChange = ({target: {value, name}}) => {
    this.setState({[name]: value})
  }
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
