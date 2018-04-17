import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../mia-ui/buttons'
import CreateContentButton from '../CreateContentButton'
import EditStoryThumb from '../EditStoryThumb'
import EditContentThumb from '../EditContentThumb'
import StoryEditor from '../StoryEditor'
import {Select, Option, Input} from '../../mia-ui/forms'
import EditorSwitcher from '../../contents/EditorSwitcher'
import DisplaySwitcher from '../../contents/DisplaySwitcher'
import {Link} from '../../mia-ui/links'
import NextLink from 'next/link'
import StoryPreview from '../../lume/Story/Story.component'
import {Flex, Box} from 'grid-styled'
import {H3, H2} from '../../mia-ui/text'
import {Break} from '../../mia-ui/layout'
import Head from '../../mia-ui/head'

export default class Editor extends Component {

  state = {
    editing: "story",
    selectedContent: null,
    contentType: "comparison",
    contents: [],
    initialized: false,
    preview: false
  }

  contentTypes = [
    "comparison",
    "detail",
    "obj",
    "picture",
    "movie"
  ]

  render(){

    if (!this.props.story) return null

    const {
      props: {
        story,
        story: {
          id: storyId,
          slug
        },
        router: {
          query: {
            subdomain
          }
        },
        saveStatus: {
          synced,
          saving,
          lastSave
        }
      },
      state: {
        editing,
        selectedContent,
        contentType,
        contents,
        preview
      },
      handleStorySelection,
      handleContentSelection,
      handleChange,
      renderContentEditor,
      handleReorder,
      contentTypes,
      togglePreview,
      renderSaveStatus

    } = this

    if (preview) return (
      <PreviewContainer
        w={1}
      >
        <PreviewButtonBox>
          <Button
            onClick={()=>this.setState({preview: false})}
            color={'blue'}
          >
            Return to Editing
          </Button>
          {(story.visibility === 'published') ? (
            <NextLink
              href={{
                pathname: '/lume/story',
                query: {
                  subdomain,
                  storySlug: slug,
                }
              }}
              as={`/${subdomain}/${slug}`}
            >
              <Button
                color={'green'}
                a
              >
                View Live
              </Button>
            </NextLink>
          ): (
            <Button
              disabled
              color={'green'}
            >
              Unpublished
            </Button>
          )}
        </PreviewButtonBox>
        <StoryPreview
          story={story}
          router={this.props.router}
        />
      </PreviewContainer>

    )

    return (
      <FullPage
        flexDirection={"column"}
        alignItems={'flex-start'}
      >
        <Head
          title={`Editing: ${story.title}`}
        />
        <PreviewButtonBox
          width={1/6}
        >
          <Button
            onClick={()=>this.setState({preview: true})}
            color={'blue'}
          >
            Preview your Story
          </Button>
          {(story.visibility === 'published') ? (
            <NextLink
              href={{
                pathname: '/lume/story',
                query: {
                  subdomain,
                  storySlug: slug,
                }
              }}
              as={`/${subdomain}/${slug}`}
            >
              <Button
                color={'green'}
                a
              >
                View Live
              </Button>
            </NextLink>
          ): (
            <Button
              disabled
              color={'green'}
            >
              Unpublished
            </Button>
          )}
        </PreviewButtonBox>
        <TopBar
          w={1}
          p={2}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >

          <Box
            w={1/6}
          >
            <Link
              href={{
                pathname: '/cms',
                query: {
                  subdomain
                }
              }}
              as={`/${subdomain}/cms`}
            >
              Back to All Stories
            </Link>
          </Box>
          <Box
            w={1/3}
          >
            <H2>{story.title ? story.title : 'Untitled Story'}</H2>
          </Box>

          <Box
            w={1/3}
          >
            {renderSaveStatus()}
          </Box>


        </TopBar>
        <Workspace
          w={1}
        >

          <Sidebar
            w={1/5}
          >
            <Flex
              flexDirection={'column'}
              p={3}
              justifyContent={'flex-start'}
              alignItems={'center'}
            >
              <EditStoryThumb
                storyId={storyId}
                selected={(editing === "story")}
                onSelect={handleStorySelection}
              />

              <Break/>

              {(contents) ? contents.map( ({
                  id,
                  __typename,
                }, index) => (
                  <EditContentThumb
                    key={id}
                    index={index}
                    contentId={id}
                    onSelect={handleContentSelection}
                    onReorder={handleReorder}
                    selected={selectedContent ? (selectedContent.id === id) : false}
                  />
              )): null}

              <Break/>

              <Select
                name={"contentType"}
                onChange={handleChange}
                value={contentType}
              >
                {contentTypes.map(type => (
                  <Option
                    key={type}
                    value={type}
                  >
                    {type}
                  </Option>
                ))}
              </Select>
              <CreateContentButton
                storyId={storyId}
                type={contentType}
              />

            </Flex>

          </Sidebar>

          <EditingPane
            width={1}
          >
            {(editing === "story") ? (
              <StoryEditor
                storyId={storyId}
              />
            ): null}

            {(editing === "content") ? (
              <EditorSwitcher
                content={selectedContent}
              />
            ): null}

          </EditingPane>

        </Workspace>

      </FullPage>
    )
  }

  renderSaveStatus = () => {
    const {
      saving,
      synced,
      lastSave
    } = this.props.saveStatus

    switch (true) {

      case (synced): {
        return (<span>All Changes Saved</span>)
      }
      default:
      case (saving): {

        return (<span>Saving</span>)
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.story) {
      let contents = nextProps.story.contents.slice().sort( (a,b) => a.index - b.index)

      this.setState({
        contents
      })

      if (this.state.selectedContent) {
        if (!nextProps.story.contents.find(content => content.id === this.state.selectedContent.id)) {
          this.setState({
            selectedContent: null,
            editing: "story"
          })
        }
      }

    }
  }

  saveReorder = () => {
    this.props.reorderContents({
      contentIds: this.state.contents.map(content => content.id),
      storyId: this.props.story.id
    })
  }

  togglePreview = () => {
    this.setState( ({preview}) => ({preview: !preview}))
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
    }, this.saveReorder)
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleStorySelection = () => {
    this.setState({
      editing: "story",
      selectedContent: null
    })
  }

  handleContentSelection = (selectedContentId) => {
    let selectedContent = this.props.story.contents.find(content => content.id === selectedContentId)
    this.setState({
      editing: "content",
      selectedContent
    })
  }


}


const FullPage = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
`

const TopBar = styled(Flex)`
  height: 55px;
  border-bottom: 1px solid black;
`

const Workspace = styled(Flex)`
  height: 100%;
  max-height: 100%;
`

const Sidebar = styled(Box)`
  height: 100%;
  max-height: 100%;
  border-right: 1px solid black;
  overflow: scroll;
`

const EditingPane = styled(Box)`
  height: 100%;

`

const PreviewContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
`

const PreviewButtonBox = styled.div`
  position: absolute;
  z-index: 1002;
  top: 8px;
  right: 8px;
`


//  <TopBar>
//   <TopTextDiv>
//     <Link
//       href={{
//         pathname: '/cms',
//         query: {
//           subdomain
//         }
//       }}
//       as={`/${subdomain}/cms`}
//     >
//       Back to All Stories
//     </Link>
//   </TopTextDiv>
//
//   <SaveStatusContainer>
//     <SaveStatus>
//       {(synced && !saving) ? `saved!` : `not saved`}
//       {saving ? `saving...` : ''}
//     </SaveStatus>
//     <LastSave>
//       {lastSave ? `last save at ${ new Date(lastSave).toLocaleTimeString()}` : ''}
//     </LastSave>
//   </SaveStatusContainer>
//
//   <PreviewButton
//     onClick={togglePreview}
//   >
//     Preview
//   </PreviewButton>
//
//
// </TopBar>
// {(preview) ? (
//   <Workspace>
//     <StoryPreview
//       story={story}
//     />
//   </Workspace>
// ): (
//   <Workspace>
//
//     <LeftBar>
//
//       <EditStoryThumb
//         storyId={storyId}
//         selected={(editing === "story")}
//         onSelect={handleStorySelection}
//       />
//
//       <Break/>
        // {
        //   (contents) ? contents.map( ({
        //     id,
        //     __typename,
        //   }, index) => (
        //     <EditContentThumb
        //       key={id}
        //       index={index}
        //       contentId={id}
        //       onSelect={handleContentSelection}
        //       onReorder={handleReorder}
        //     />
        //   )): null
        // }
//
//
//
//       <Break/>
//
      // <Select
      //   name={"contentType"}
      //   onChange={handleChange}
      //   value={contentType}
      // >
      //   {contentTypes.map(type => (
      //     <Option
      //       key={type}
      //       value={type}
      //     >
      //       {type}
      //     </Option>
      //   ))}
      // </Select>
      // <CreateContentButton
      //   storyId={storyId}
      //   type={contentType}
      // />
//
//     </LeftBar>
//
//     <EditorContainer>
//
//
      // {(editing === "story") ? (
      //   <StoryEditor
      //     storyId={storyId}
      //     ref={(ref) => {this.storyEditor = ref}}
      //   />
      // ): null}
//
//       {(editing === "content") ? (
//         <EditorSwitcher
//           content={selectedContent}
//         />
//       ): null}
//
//     </EditorContainer>
//
//   </Workspace>
// )}
// const SaveStatusContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   flex-direction: column;
//   height: 100%;
// `
//
// const SaveStatus = styled.div`
//   height: 100%;
//   font-size: 18px;
// `
//
// const LastSave = styled.div`
//   color: grey;
//   font-size: 12px;
//   min-height: 100%;
// `
//
// const PreviewButton = styled(Button)`
//
// `
//
// const TopTextDiv = styled.div`
//   display: flex;
//   margin-right: 30px;
// `
//
// const Container = styled.div`
//   width: 100%;
//   max-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
// `
//
// const TopBar = styled.div`
//   display: flex;
//   flex-direction: row;
//   height: 60px;
//   width: 100%;
//   border-bottom: 1px solid black;
//   align-items: center;
//   padding: 20px;
//   box-sizing:border-box;
//   justify-content: space-between;
// `
//
// const Workspace = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   height: 100%;
// `
//
// const LeftBar = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 250px;
//   max-height: 100%;
//   padding: 50px;
//   border-right: 1px solid black;
//   align-items: center;
//   overflow-y: scroll;
// `
//
// const Break = styled.hr`
//   width: 100%;
//   margin: 20px 0;
//   border: 1px solid grey;
// `
//
// const EditorContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   justify-content: flex-start;
//   align-items: flex-start;
// `
//
// const PreviewSpace = styled.div`
//   display: flex;
//   min-height: 40vh;
//   width: 100%;
//   height: 100%;
//   border-bottom: 1px solid black;
//   box-sizing:border-box;
//   overflow: clipped;
// `
