import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import CreateContentButton from '../CreateContentButton'
import EditStoryThumb from '../EditStoryThumb'
import EditContentThumb from '../EditContentThumb'
import ComparisonEditor from '../ComparisonEditor'
import PictureEditor from '../PictureEditor'
import StoryEditor from '../StoryEditor'

import {Select, Option} from '../../ui/forms'

export default class Editor extends Component {

  state = {
    editing: "story",
    selectedContentId: "",
    contentType: "Comparison"
  }

  contentTypes = ["Comparison", "Detail", "Movie", "Obj", "Picture"]

  render(){



    const {
      props: {
        storyId,
        story
      },
      state: {
        editing,
        selectedContentId,
        contentType
      },
      handleStorySelection,
      handleContentSelection,
      handleChange,
      renderContentEditor
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
              (story) ? story.contents.map( ({
                id,
                __typename
              }) => (
                <EditContentThumb
                  key={id}
                  contentId={id}
                  type={__typename}
                  onSelect={handleContentSelection}
                />
              )): null
            }

            <Break/>

            <Select
              name={"contentType"}
              onChange={handleChange}
              value={contentType}
            >
              {this.contentTypes.map(contentType => (
                <Option
                  key={contentType}
                  value={contentType}
                >
                  {contentType}
                </Option>
              ))}
            </Select>
            <CreateContentButton
              storyId={storyId}
              type={contentType}
            />

          </LeftBar>

          <EditorContainer>

            <PreviewSpace/>

            {renderContentEditor(selectedContentId)}

          </EditorContainer>

        </Workspace>


      </Container>
    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

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

  renderContentEditor = (selectedContentId) => {
    if (!selectedContentId) return (
      <StoryEditor
        storyId={this.props.storyId}
        subdomain={this.props.subdomain}
      />
    )
    const {
      contents
    } = this.props.story

    let type = contents.find(content => content.id === selectedContentId).__typename

    switch (type) {
      case "Comparison": {

        return (
          <ComparisonEditor
            comparisonId={selectedContentId}
          />
        )
      }
      case "Picture": {

        return (
          <PictureEditor
            pictureId={selectedContentId}
          />
        )
      }
      default: {
        break

      }
    }

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

const PreviewSpace = styled.div`
  display: flex;
  height: 50%;
  width: 100%;
  background-color: lightblue;
`
