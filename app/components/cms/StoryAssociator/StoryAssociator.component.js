import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import Modal from '../../ui/modal'
import {Row, Column} from '../../ui/layout'
import {H4} from '../../ui/h'
import {Search} from '../../ui/search'
import {Checkbox} from '../../ui/forms'
import {Link} from '../../ui/links'

export default class StoryAssociator extends Component {

  static defaultProps = {
    stories: [],
    story: {
      relatedStories: []
    }
  }

  state = {
    modal: false,
    search: "",
  }

  render() {
    const {
      state: {
        search,
        checked
      },
      props: {
        stories,
        story: {
          relatedStories
        },
        storyId,
        router: {
          query: {
            subdomain
          }
        }
      },
      handleChange,
      handleAdd,
      handleRemove
    } = this

    let relatedStoryIds = relatedStories.map(story => story.id)

    let unrelatedStories = stories.slice().filter( story => {
      return !relatedStoryIds.includes(story.id) && story.id !== storyId
    })

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
          <ModalContainer>
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
                {unrelatedStories.map( story => (
                  <StoryRow
                    key={story.id}
                  >
                    <Link
                      href={{
                        pathname: '/cms/story',
                        query: {
                          subdomain,
                          storyId: story.id
                        }
                      }}
                      as={`/${subdomain}/cms/${story.id}`}
                    >
                      {story.title}
                    </Link>
                    <Button
                      onClick={()=>{handleAdd(story.id)}}
                      color={"green"}
                    >
                      Add
                    </Button>
                  </StoryRow>
                ))}
              </Column>
              <Column>
                <H4>
                  Current Associations
                </H4>
                {relatedStories.map( story => (
                  <StoryRow
                    key={story.id}
                  >
                    <Link
                      href={{
                        pathname: '/cms/story',
                        query: {
                          subdomain,
                          storyId: story.id
                        }
                      }}
                      as={`/${subdomain}/cms/${story.id}`}
                    >
                      {story.title}
                    </Link>
                    <Button
                      onClick={()=>{handleRemove(story.id)}}
                      color={'red'}
                    >

                    </Button>
                  </StoryRow>
                ))}
              </Column>
            </Row>
          </ModalContainer>

        </Modal>

      </Container>
    )
  }

  handleChange = ({target: {value, name}}) => {
    this.setState({[name]: value})
  }

  handleAdd = (addRelatedStoryId) => {
    this.props.editStory({
      addRelatedStoryId
    })
  }

  handleRemove = (removeRelatedStoryId) => {
    this.props.editStory({
      removeRelatedStoryId
    })
  }

}

const StoryRow = styled(Row)`
  border: 1px solid lightgrey;
  margin: 2px;
  min-height: 20px;
`

const ModalContainer = styled(Column)`
  width: 500px;
  height: 500px;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
