import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { H3 } from '../../mia-ui/text'
import { Waiting } from '../../mia-ui/loading'
import { Button } from '../../mia-ui/buttons'
// import Image from '../../shared/Image'
import {
  Title,
  Description,
  Label,
  Select,
  Option,
  MultiSelect,
  Input
} from '../../mia-ui/forms'
import { ChangeImage } from '../DefaultEditors'
import ImageManager from '../ImageManager'
import DeleteStoryButton from '../DeleteStoryButton'
import StoryAssociator from '../StoryAssociator'
import StoryGroupSelector from '../StoryGroupSelector'
import { ToolTip } from '../../mia-ui/tooltips'
import { Flex, Box } from 'grid-styled'
import { Expander } from '../../mia-ui/expanders'
import Joyride from 'react-joyride'

export default class StoryEditor extends Component {
  static defaultProps = {
    storyId: PropTypes.string.isRequired
  }

  initialValues = {
    title: '',
    description: '',
    previewImageId: undefined,
    template: 'original',
    visibility: 'draft',
    slug: '',
    slugPending: false,
    id: ''
  }

  wait = duration => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }

  write = async (text, name) => {
    try {
      for (let i = 0; i <= text.length; i++) {
        await this.wait(50)
        this.handleChange({
          target: {
            name,
            value: text.slice(0, i)
          }
        })
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  demoSteps = [
    {
      target: '#story-description',
      content: (
        <div>
          <p>
            Your story should definitely include a description. Try and keep it
            short!
          </p>

          <p>
            Bonus tip: all of the description fields in Lume allow you to use
            markdown styling to emphasis your writing!
          </p>
          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({ demoIndex: demoIndex + 1 }))
            }}
          >
            Next
          </Button>
        </div>
      ),
      disableBeacon: true,
      spotlightClicks: true
    },
    {
      target: '#save-status',
      content: (
        <div>
          <p>
            While you're editing, take not of the save status at the top of the
            page. Lume will automatically save any edits you make so you don't
            need to worry about losing your work.
          </p>

          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({ demoIndex: demoIndex + 1 }))
            }}
          >
            Next
          </Button>
        </div>
      ),
      disableBeacon: true
    },
    {
      target: '#change-story-image',
      content: (
        <div>
          <p>
            It's also important to give your story an image. Whenever a part of
            your story allows you to include an image, Lume will provide you
            with a tool that looks like this.
          </p>

          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({
                showChangeImageDemo: true,
                showDemo: false,
                demoIndex: demoIndex + 1
              }))
            }}
          >
            Next
          </Button>
        </div>
      ),
      disableBeacon: true
    },
    {
      target: '#story-slug',
      content: (
        <div>
          <p>
            One of the neat things about Lume is that every story has its own
            unique url (which you'll be able to visit once you set your story's
            visibility to published).
          </p>
          <p>
            You have the ability to change the text that will appear in your
            stories url by editing the Pretty Url field. Be careful though!
            Editing this field could break old links for users if you've already
            shared your story.
          </p>
          <Button
            onClick={() => {
              this.setState(({ demoIndex }) => ({
                demoIndex: demoIndex + 1,
                showDemo: false
              }))

              this.props.onDemoFinish()
            }}
          >
            Next
          </Button>
        </div>
      ),
      disableBeacon: true
    }
  ]

  handleChangeImageDemoFinish = () => {
    this.setState(({ demoIndex }) => ({
      showChangeImageDemo: false,
      showDemo: true,
      changeImageDemoFinished: true
    }))
    this.props.handleStoryEditorDemoFinish()
  }

  handleDemoChange = async ({ action, index, lifecycle, step }) => {
    try {
      if (
        action === 'update' &&
        index === 0 &&
        lifecycle === 'tooltip' &&
        !this.state.description
      ) {
        await this.write(
          'Frankenstein is a monster story by Mary Shelley. It is *the best.*',
          'description'
        )
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  state = {
    ...this.initialValues,
    sync: true
  }

  tips = [
    {
      target: '#story-title',
      content: 'You can edit the title of your story here.',
      placement: 'auto'
    },
    {
      target: '#story-description',
      content:
        "Edit your story's description here. This field accepts mark down styling!",
      placement: 'auto'
    },
    {
      target: '#change-story-image',
      content:
        'Give your story a main image so users can get a preview when the story appears in search results.',
      placement: 'auto'
    },
    {
      target: '#story-slug',
      content:
        'The Pretty Url field allows you to change the address of your story. Be careful, however, changing this could break old links!',
      placement: 'auto'
    },
    {
      target: '#story-template',
      content: 'Stories can be presented in several different ways.',
      placement: 'auto'
    },
    {
      target: '#story-visibility',
      content:
        "When you're ready to share your story with the public, change the visibility setting to published. Now your story will appear with your other stories on your organization's public page!",
      placement: 'auto'
    },
    {
      target: '#delete-story',
      content:
        'This button will permanently delete your story. Be careful! There is no undoing this!',
      placement: 'auto'
    }
  ]

  render() {
    console.log(this)

    if (!this.props.story) return null

    const {
      state: {
        title,
        description,
        previewImageId,
        template,
        visibility,
        slug,
        slugPending
      },
      handleChange,
      handleSlugChange,
      handleSave,
      handleGroupSelectionSave,
      props: {
        storyId,
        router,
        story: { groups, previewImage }
      }
    } = this

    return (
      <Flex width={1} p={3}>
        <Flex width={1 / 2} flexDirection={'column'} pr={4}>
          <Title
            name={'title'}
            value={title}
            onChange={handleChange}
            label={'Title'}
            id={'story-title'}
          />

          <Description
            name={'description'}
            value={description}
            onChange={handleChange}
            label={'Description'}
            id={'story-description'}
          />

          <ChangeImage
            label={'Image'}
            name={'previewImageId'}
            image={previewImage}
            onChange={handleChange}
            id={'change-story-image'}
            showDemo={this.state.showChangeImageDemo}
            onDemoFinish={this.handleChangeImageDemoFinish}
          />

          <StoryGroupSelector
            onGroupSelectionSave={handleGroupSelectionSave}
            selectedGroupIds={groups.map(group => group.id)}
            storyId={storyId}
          />
        </Flex>
        <Flex w={1 / 2} flexDirection={'row'} flexWrap={'wrap'}>
          <Box w={1} id={'story-slug'}>
            <Label>Pretty Url</Label>
            <Input
              name={'slug'}
              value={slug}
              onChange={handleSlugChange}
              disabled={slugPending}
            />
          </Box>
          <Box w={1} id={'story-template'}>
            <Label>Template</Label>
            <Select
              name={'template'}
              onChange={handleChange}
              value={template || 'original'}
            >
              <Option value={'original'}>Original</Option>
              <Option value={'slider'}>Slider</Option>
            </Select>
          </Box>
          <Box w={1} id={'story-visibility'}>
            <Label>Visibility</Label>
            <Select
              name={'visibility'}
              onChange={handleChange}
              value={visibility || 'draft'}
            >
              <Option value={'draft'}>Draft</Option>
              <Option value={'published'}>Published</Option>
            </Select>
          </Box>
          <Box w={1}>
            <StoryAssociator storyId={storyId} />
          </Box>
          <Flex w={1}>
            <DeleteStoryButton storyId={storyId} />
          </Flex>
        </Flex>
        <Joyride
          run={this.state.showDemo ? true : false}
          steps={this.state.demoSteps}
          stepIndex={this.state.demoIndex}
          callback={this.handleDemoChange}
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
          disableOverlayClose={true}
          disableCloseOnEscape={true}
        />
      </Flex>
    )
  }

  bounce = true

  debounce = func => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(func, 2000)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      demoIndex: 0,
      demoSteps: this.demoSteps,
      ...this.createStateFromProps(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.createStateFromProps(nextProps)
    })

    if (nextProps.showDemo && !this.state.showChangeImageDemo) {
      this.setState({ showDemo: true })
    }
  }

  createStateFromProps = props => {
    if (props.story && props.storyId !== this.state.id) {
      let {
        story,
        story: { previewImage }
      } = props

      return {
        ...story,
        previewImageId: previewImage ? previewImage.id : ''
      }
    }
  }

  handleGroupSelectionSave = async selectedGroupIds => {
    try {
      this.props.setSaveStatus({
        synced: false
      })

      await this.props.editStory({
        setGroupsIds: selectedGroupIds
      })

      this.props.setSaveStatus({
        synced: true
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  handleSlugChange = e => {
    e.target.value = e.target.value
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .toLowerCase()

    let name = e.target.name
    let value = e.target.value

    let reservedSlugs = ['pending', 'settings']

    if (reservedSlugs.includes(value)) {
      value = value.concat('-story')
    }

    this.setState(
      () => ({
        [name]: value
      }),
      () => {
        this.props.setSaveStatus({
          synced: false
        })
        this.debounce(this.handleSlugSave, 2000)
      }
    )
  }

  handleSlugSave = async () => {
    try {
      this.setState({
        slugPending: true
      })
      let {
        data: {
          editStory: { slug }
        }
      } = await this.props.editStory({
        slug: this.state.slug
      })

      this.setState({
        slugPending: false,
        slug
      })

      this.props.router.replace(
        {
          pathname: this.props.router.pathname,
          query: {
            ...this.props.router.query,
            storySlug: slug
          }
        },
        `/cms/${this.props.router.query.subdomain}/${slug}`
      )
    } catch (ex) {
      console.error(ex)
    }
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState(
      () => ({
        [name]: value
      }),
      () => {
        this.props.setSaveStatus({
          synced: false
        })
        this.debounce(this.handleSave)
      }
    )
  }

  handleSave = async () => {
    try {
      await this.props.editStory({
        ...this.state,
        slugPending: undefined,
        previewImageId: this.state.previewImageId || undefined
      })

      this.props.setSaveStatus({
        synced: true
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  componentWillUnmount() {
    this.handleSave()
    this.props.removeTips({
      tips: this.tips
    })
  }
}

// const Top = styled.div`
//   display: flex;
//   justify-content:space-between;
//   min-height: 70px;
//   width: 100%;
// `
//
// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 20px;
//   box-sizing:border-box;
//   overflow-y:scroll;
// `
//
//
//
// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   height: 100%;
//   width: 50%;
// `
//
// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   height: 100%;
//   min-height: 400px;
// `
