import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import CreateContentButton from '../CreateContentButton'
import EditStoryThumb from '../EditStoryThumb'

export default class Editor extends Component {

  state = {
    editing: "story",
    selectedContentId: ""
  }

  render(){



    const {
      props: {
        storyId,
        story
      },
      state: {
        editing
      },
      handleStorySelection,
      handleContentSelection
    } = this

    return (
      <Container>
        <TopBar>
          <Button>
            Save
          </Button>
        </TopBar>
        <Workspace>

          <LeftBar>

            <EditStoryThumb
              storyId={storyId}
              selected={(editing === "story")}
              onSelect={handleStorySelection}
            />

            <Break/>

            {
              (story) ? story.contents.map( ({id}) => (
                <ContentThumb
                  key={id}
                  onSelect={handleContentSelection}
                />
              )): null
            }

            <Break/>

            <CreateContentButton
              storyId={storyId}
              type={"comparison"}
            />

          </LeftBar>




          <EditorContainer>

          </EditorContainer>

        </Workspace>


      </Container>
    )
  }

  handleStorySelection = () => {
    this.setState({
      editing: "story",
      selectedContentId: ""
    })
  }

  handleContentSelection = (selectedContentId) => {
    this.setState({
      editing: "content",
      selectedContentId
    })
  }

}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid black;
`

const Workspace = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

const LeftBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  padding: 50px;
  border-right: 1px solid black;
  align-items: center;
`

const Break = styled.hr`
  width: 100%;
  margin: 20px 0;
  border: 1px solid grey;
`

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
`

const ContentThumb = styled.div`
  height: 100px;
  width: 100px;
  background-color: salmon;
`
