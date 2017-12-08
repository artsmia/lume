import React, {Component} from 'react'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import StoryList from '../StoryList'
import {Button} from '../../ui/buttons'

export default class Home extends Component {


  render() {

    if (this.props.loading) return <Spinner/>

    const {
      props: {
        organization: {
          name
        },
        createStory,
        orgSub
      }
    } = this
    return (
      <Container>
        <H2>
          {name}
        </H2>

        <Button
          onClick={createStory}
        >
          Create Object Story
        </Button>

        <StoryList
          orgSub={orgSub}
        />

      </Container>
    )
  }

  createStory = async () => {
    try {
      const {
        createStory,
        orgSub,
        organization: {
          id: organizationId
        }
      } = this.props

      const {data: {createStory: story}} = await createStory({
        variables: {
          organizationId
        }
      })

      router.push({
        pathname: '/cms/edit',
        query: {
          orgSub,
          storyId: story.id
        }
      }, `/${orgSub}/cms/${story.id}`)
    } catch (ex) {
      console.error(ex)
    }
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  width: 50%;
  align-items: flex-start;
  border: 1px solid black;
  min-height: 100vh;
  padding: 20px;
`
