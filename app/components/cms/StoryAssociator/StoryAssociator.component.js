import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../mia-ui/buttons'
import {Modal} from '../../mia-ui/modals'
import {H4, H2} from '../../mia-ui/text'
import {CheckboxInput, Search} from '../../mia-ui/forms'
import {Link} from '../../mia-ui/links'
import {Flex, Box} from 'grid-styled'

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
      <Container
        flexWrap={'wrap'}
        my={2}
        p={1}
      >
        <Box
          w={1}
        >
          <H2>
            Associated Stories
          </H2>
        </Box>


            <Flex
              w={1}
            >

              <Box
                w={1}
              >
                <Box
                  w={1}
                >
                  <Search
                    value={search}
                    name={"search"}
                    onChange={handleChange}
                  />
                </Box>
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
              </Box>
              <Box
                w={1}
              >
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
              </Box>
            </Flex>

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

const StoryRow = styled.div`
  border: 1px solid lightgrey;
  margin: 2px;
  min-height: 20px;
`

const ModalContainer = styled.div`
  width: 500px;
  height: 500px;
`

const Container = styled(Flex)`
  height: 500px;
  overflow-y: scroll;
  border: 1px solid ${({theme}) => theme.color.gray30};
  border-radius: 4px;
`
