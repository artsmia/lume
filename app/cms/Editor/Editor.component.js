import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/buttons'
import CreateContentButton from '../CreateContentButton'
import EditStoryThumb from '../EditStoryThumb'
import EditContentThumb from '../EditContentThumb'
import ComparisonEditor from '../ComparisonEditor'
import PictureEditor from '../PictureEditor'
import ObjEditor from '../ObjEditor'
import MovieEditor from '../MovieEditor'
import StoryEditor from '../StoryEditor'
import DetailEditor from '../DetailEditor'

import {Select, Option} from '../../ui/forms'

export default class Editor extends Component {

  state = {
    editing: "story",
    selectedContentId: "",
    contentType: "Comparison",
    contents: [],
    initialized: false
  }

  contentTypes = ["Comparison", "Detail", "Movie", "Obj", "Picture"]

  render(){

    if (!this.props.story) return null

    const {
      props: {
        storyId,
        story
      },
      state: {
        editing,
        selectedContentId,
        contentType,
        contents
      },
      handleStorySelection,
      handleContentSelection,
      handleChange,
      renderContentEditor,
      handleReorder
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
                (contents) ? contents.map( ({
                  id,
                  __typename,
                }, index) => (
                  <EditContentThumb
                    key={id}
                    index={index}
                    contentId={id}
                    storyId={storyId}
                    type={__typename}
                    onSelect={handleContentSelection}
                    onReorder={handleReorder}
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

            <PreviewSpace>

            </PreviewSpace>

            {renderContentEditor(selectedContentId)}

          </EditorContainer>

        </Workspace>


      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.story && !this.state.initialized) {
      let contents = nextProps.story.contents.slice().sort( (a,b) => a.index - b.index)

      this.setState({
        initialized: true,
        contents
      })
    }



  }

  handleReorder = (dragIndex, hoverIndex) => {

    this.setState(({contents: oldContents}) => {

      let contents = oldContents.slice()
      let temporary = contents[hoverIndex]
      contents[hoverIndex] = contents[dragIndex]
      contents[dragIndex] = temporary

      return {
        contents
      }
    })
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

    const {
      story,
      subdomain,
      storyId
    } = this.props

    if (!selectedContentId) return (
      <StoryEditor
        storyId={storyId}
        subdomain={subdomain}
      />
    )


    let type = story.contents.find(content => content.id === selectedContentId).__typename

    switch (type) {
      case "Comparison": {

        return (
          <ComparisonEditor
            comparisonId={selectedContentId}
            subdomain={subdomain}
          />
        )
      }
      case "Picture": {

        return (
          <PictureEditor
            pictureId={selectedContentId}
            subdomain={subdomain}
          />
        )
      }
      case "Obj": {

        return (
          <ObjEditor
            objId={selectedContentId}
            subdomain={subdomain}
          />
        )
      }
      case "Movie": {

        return (
          <MovieEditor
            movieId={selectedContentId}
            subdomain={subdomain}
          />
        )
      }
      case "Detail": {

        return (
          <DetailEditor
            detailId={selectedContentId}
            subdomain={subdomain}
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
