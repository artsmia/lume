import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../mia-ui/buttons'
import {Modal} from '../../mia-ui/modals'
import {H4, H2} from '../../mia-ui/text'
import {CheckboxInput, Search, MultiSelect} from '../../mia-ui/forms'
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
      handleSearch,
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
        alignItems={'flex-start'}
      >
        <Box
          w={1}
        >
          <H2>
            Associated Stories
          </H2>
        </Box>

        <MultiSelect
          options={unrelatedStories.map(({title,id}) => ({
            value: id,
            name: title
          }))}
          selections={relatedStories.map(({title, id}) => ({
            value: id,
            name: title
          }))}
          onSearchChange={handleSearch}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />


      </Container>
    )
  }

  handleSearch = (search) => {
    this.setState(
      (prevProps) => ({search}),
      ()=>{

        let {
          variables,
          refetch
        } = this.props

        variables.filter.search = search


        refetch(variables)
      }
    )
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


const Container = styled(Flex)`
  border: 1px solid ${({theme}) => theme.color.gray30};
  border-radius: 4px;
`
