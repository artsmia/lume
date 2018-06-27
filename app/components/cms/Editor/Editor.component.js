import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from '../../mia-ui/buttons'
import CreateContentButton from '../CreateContentButton'
import EditStoryThumb from '../EditStoryThumb'
import EditContentThumb from '../EditContentThumb'
import StoryEditor from '../StoryEditor'
import { Select, Option, Input } from '../../mia-ui/forms'
import EditorSwitcher from '../../contents/EditorSwitcher'
import DisplaySwitcher from '../../contents/DisplaySwitcher'
import { Link } from '../../mia-ui/links'
import NextLink from 'next/link'
import StoryPreview from '../../lume/Story/Story.component'
import { Flex, Box } from 'grid-styled'
import { H3, H2 } from '../../mia-ui/text'
import { Break } from '../../mia-ui/layout'
import { Icon } from '../../mia-ui/icons'

import Head from '../../shared/head'
import Joyride from 'react-joyride'
import { Loading } from '../../mia-ui/loading'
import { CreateContent } from '../../../apollo/mutations/createContent'
import Tour from '../../shared/Tours'

export default class Editor extends Component {
  tourId = 'editor'

  contentTypes = ['comparison', 'detail', 'obj', 'picture', 'movie', 'map']

  tips = [
    {
      target: '#save-status',
      content:
        'Your story will be automatically saved after each change. You can see the save status here.',
      placement: 'bottom-end'
    },
    {
      target: '#preview-button',
      content:
        'You can see a preview of your story at anytime by clicking here.',
      placement: 'bottom-start'
    },
    {
      target: '#live-button',
      content:
        "And once you've published your story, you can see it live by clicking here.",
      placement: 'bottom-start'
    },
    {
      target: '#sidebar',
      content:
        'By clicking on the various tiles on the left, you can edit your story and the content items that make up your story.',
      placement: 'auto'
    },
    {
      target: '#story-thumb',
      content:
        'The top tile in the sidebar allows you to edit the details of your story. This is where you can change its title, main image, visibility and more.',
      placement: 'auto'
    },
    {
      target: '#create-content',
      content:
        'Each story is made up of "Contents". To create a new Content, select the content\'s type and then click "Create Content."',
      placement: 'auto'
    }
  ]

  render() {
    if (!this.props.story) return <Loading />

    const {
      props: {
        story,
        story: { id: storyId, slug },
        router,
        router: {
          query: { subdomain }
        },
        saveStatus: { synced },
        organization
      },
      state: { editing, selectedContent, contentType, contents, preview },
      handleStorySelection,
      handleContentSelection,
      handleChange,
      renderContentEditor,
      handleReorder,
      contentTypes,
      togglePreview,
      renderSaveStatus
    } = this

    if (preview)
      return (
        <PreviewContainer w={1}>
          <PreviewButtonBox flexWrap={'nowrap'}>
            <Button
              onClick={this.togglePreview}
              color={'blue'}
              id={'preview-button'}
            >
              Return to Editing
            </Button>
            {story.visibility === 'published' ? (
              <Button
                color={'green'}
                a
                href={`${process.env.LUME_URL}/${subdomain}/${slug}`}
              >
                View Live
              </Button>
            ) : (
              <Button disabled color={'green'}>
                Unpublished
              </Button>
            )}
            <Button
              round
              size={'40px'}
              onClick={() => {
                this.setState({
                  print: false,
                  preview: false
                })
              }}
            >
              <Icon color={'white'} icon={'print'} />
            </Button>
          </PreviewButtonBox>
          <StoryPreview story={story} print={this.state.print} />
          {this.state.tour ? (
            <Joyride
              run={this.state.tour.run(this)}
              steps={this.state.tour.steps(this)}
              callback={this.state.tour.callback(this)}
              stepIndex={this.state.tour.stepIndex}
              styles={{
                buttonClose: {
                  display: 'none'
                },
                buttonNext: {
                  display: 'none'
                },
                buttonBack: {
                  display: 'none'
                }
              }}
            />
          ) : null}
        </PreviewContainer>
      )

    return (
      <FullPage flexDirection={'column'} alignItems={'flex-start'}>
        {story ? <Head title={`Editing: ${story.title}`} /> : null}

        <PreviewButtonBox flexWrap={'nowrap'}>
          <Button
            onClick={this.togglePreview}
            color={'blue'}
            id={'preview-button'}
          >
            Preview your Story
          </Button>
          {story.visibility === 'published' ? (
            <NextLink
              href={{
                pathname: '/lume/story',
                query: {
                  subdomain,
                  storySlug: slug
                }
              }}
              as={`/${subdomain}/${slug}`}
            >
              <Button color={'green'} a id={'live-button'}>
                View Live
              </Button>
            </NextLink>
          ) : (
            <Button disabled color={'green'} id={'live-button'}>
              Unpublished
            </Button>
          )}

          <Button
            round
            size={'40px'}
            onClick={() => {
              this.setState(({ print }) => ({
                print: true,
                preview: true
              }))
            }}
          >
            <Icon color={'white'} icon={'print'} />
          </Button>
        </PreviewButtonBox>
        <TopBar w={1} p={2} alignItems={'center'} justifyContent={'flex-start'}>
          <Box w={1 / 6}>
            <Link
              href={{
                pathname: '/cms',
                query: {
                  subdomain
                }
              }}
              as={`/${subdomain}`}
            >
              Back to All Stories
            </Link>
          </Box>
          <Box w={1 / 3}>
            <H2>{story.title ? story.title : 'Untitled Story'}</H2>
          </Box>

          <Box w={1 / 3}>{renderSaveStatus()}</Box>
        </TopBar>
        <Workspace w={1}>
          <Sidebar w={1 / 5} id={'sidebar'}>
            <Flex
              flexDirection={'column'}
              p={3}
              justifyContent={'flex-start'}
              alignItems={'center'}
            >
              <EditStoryThumb
                storyId={storyId}
                selected={editing === 'story'}
                onSelect={handleStorySelection}
              />

              <Break />

              {contents
                ? contents.map(({ id, __typename, type }, index) => (
                    <EditContentThumb
                      key={id}
                      index={index}
                      contentId={id}
                      onSelect={handleContentSelection}
                      onReorder={handleReorder}
                      selected={
                        selectedContent ? selectedContent.id === id : false
                      }
                    />
                  ))
                : null}

              <Break />

              <div id={'create-content'}>
                <Select
                  name={'contentType'}
                  onChange={handleChange}
                  value={contentType}
                  innerRef={ref => {
                    this.contentTypeRef = ref
                  }}
                >
                  {contentTypes.map(type => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
                <CreateContentButton storyId={storyId} type={contentType} />
              </div>
            </Flex>
          </Sidebar>

          <EditingPane width={1} id={'editing-pane'}>
            {editing === 'story' ? (
              <StoryEditor
                storyId={storyId}
                tour={this.state.tour ? this.state.tour : false}
              />
            ) : null}

            {editing === 'content' ? (
              <EditorSwitcher
                content={selectedContent}
                tour={this.state.tour ? this.state.tour : false}
              />
            ) : null}
          </EditingPane>
        </Workspace>

        {this.state.tour ? (
          <Joyride
            run={this.state.tour.run(this)}
            steps={this.state.tour.steps(this)}
            callback={this.state.tour.callback(this)}
            stepIndex={this.state.tour.stepIndex}
            styles={{
              buttonClose: {
                display: 'none'
              },
              buttonNext: {
                display: 'none'
              },
              buttonBack: {
                display: 'none'
              }
            }}
          />
        ) : null}
      </FullPage>
    )
  }

  componentDidMount() {
    if (this.props.router.query.tour) {
      this.setState({ tour: new Tour(this) })
    }

    window.onbeforeprint = e => {
      this.setState({
        print: true,
        preview: true
      })
    }
  }

  componentWillUnmount() {
    window.onbeforeprint = undefined
  }

  handleDetailDemoFinish = () => {
    this.setState({
      showDemo: true
    })
  }

  handleObjDemoFinish = () => {
    this.setState({
      showObjContentDemo: false,
      showDemo: true
    })
  }

  renderSaveStatus = () => {
    const { synced } = this.props.saveStatus

    if (synced) {
      return <span id={'save-status'}>All Changes Saved</span>
    } else {
      return <span id={'save-status'}>...saving</span>
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.state = {
      editing: 'story',
      selectedContent: null,
      contentType: 'comparison',
      contents: [],
      initialized: false,
      preview: false,
      ...this.propsToState(props)
    }
    this.contentTypeRef = React.createRef()
  }

  propsToState = props => {
    if (props.story) {
      let state = {}

      let contents = props.story.contents
        .slice()
        .sort((a, b) => a.index - b.index)

      Object.assign(state, { contents })

      if (this.state.selectedContent) {
        if (
          !props.story.contents.find(
            content => content.id === this.state.selectedContent.id
          )
        ) {
          Object.assign(state, {
            selectedContent: null,
            editing: 'story'
          })
        }
      }

      return state
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.propsToState(nextProps)
    })
  }

  saveReorder = () => {
    this.props.reorderContents({
      contentIds: this.state.contents.map(content => content.id),
      storyId: this.props.story.id
    })
  }

  togglePreview = () => {
    this.setState(({ preview }) => ({ preview: !preview }))
    if (this.state.tour) {
      this.state.tour.nextStep()
    }
  }

  handleReorder = (dragIndex, hoverIndex) => {
    this.setState(({ contents: oldContents }) => {
      let contents = oldContents.slice()
      let temporary = contents[hoverIndex]
      contents[hoverIndex] = contents[dragIndex]
      contents[dragIndex] = temporary

      return {
        contents
      }
    }, this.saveReorder)
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value })

  handleStorySelection = () => {
    this.setState({
      editing: 'story',
      selectedContent: null
    })
  }

  handleContentSelection = selectedContentId => {
    let selectedContent = this.props.story.contents.find(
      content => content.id === selectedContentId
    )
    this.setState({
      editing: 'content',
      selectedContent
    })
  }
}

const FullPage = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  background-color: white;
`

const TopBar = styled(Flex)`
  height: 65px;
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

const PreviewButtonBox = styled(Flex)`
  position: absolute;
  z-index: 99;
  top: 8px;
  right: 110px;
  @media print {
    display: none;
  }
`
