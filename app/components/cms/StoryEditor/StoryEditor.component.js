import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../mia-ui/text'
import {Waiting} from '../../mia-ui/loading'
import {Button} from '../../mia-ui/buttons'
// import Image from '../../shared/Image'
import {Title, Description, Label, Select, Option, MultiSelect, Input} from '../../mia-ui/forms'
import {ChangeImage} from '../DefaultEditors'
import ImageManager from '../ImageManager'
import DeleteStoryButton from '../DeleteStoryButton'
import StoryAssociator from '../StoryAssociator'
import StoryGroupSelector from '../StoryGroupSelector'
import {ToolTip} from '../../mia-ui/tooltips'
import {Flex, Box} from 'grid-styled'
import {Expander} from '../../mia-ui/expanders'

export default class StoryEditor extends Component {

  static defaultProps = {
    storyId: PropTypes.string.isRequired,
  }

  initialValues = {
    title: "",
    description: "",
    previewImageId: undefined,
    template: "original",
    visibility: "draft",
    slug: '',
    slugPending: false,
    id: ''
  }

  state = {
    ...this.initialValues,
    sync: true
  }



  render() {

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
        story: {
          groups,
          previewImage
        },
        organization
      }
    } = this

    return (
      <Flex
        width={1}
        p={3}
      >
        <Flex
          width={1/2}
          flexDirection={'column'}
          pr={4}
        >

          <ToolTip>
            Give your story a title.
          </ToolTip>

          <Title
            name={'title'}
            value={title}
            onChange={handleChange}
            label={'Title'}
          />

          <ToolTip>
            Pro-tip: Make use of <a href={"https://help.github.com/articles/basic-writing-and-formatting-syntax/"}>"markdown styling"</a> to add formatting to your description
          </ToolTip>
          <Description
            name={'description'}
            value={description}
            onChange={handleChange}
            label={'Description'}
          />

          <ToolTip>
            Give users a sneak peak of the story they're about to visit by providing a preview image.
          </ToolTip>
          <ChangeImage
            label={"Image"}
            name={"previewImageId"}
            image={previewImage}
            onChange={handleChange}
          />

          <StoryGroupSelector
            onGroupSelectionSave={handleGroupSelectionSave}
            selectedGroupIds={groups.map(group => group.id)}
            storyId={storyId}
          />



        </Flex>
        <Flex
          w={1/2}
          flexDirection={'row'}
          flexWrap={'wrap'}
        >

          <Box
            w={1}
          >
            <Label>
              Pretty Url
            </Label>
            <Input
              name={'slug'}
              value={slug}
              onChange={handleSlugChange}
              disabled={slugPending}
            />
          </Box>
          <Box
            w={1}
          >
            <Label>
              Template
            </Label>
            <Select
              name={"template"}
              onChange={handleChange}
              value={template || 'original'}
            >
              <Option
                value={"original"}
              >
                Original
              </Option>
              <Option
                value={"slider"}
              >
                Slider
              </Option>
            </Select>
          </Box>
          <Box
            w={1}
          >
            <Label>
              Visibility
            </Label>
            <Select
              name={"visibility"}
              onChange={handleChange}
              value={visibility || 'draft'}
            >

              <Option
                value={"draft"}
              >
                Draft
              </Option>
              <Option
                value={"published"}
              >
                Published
              </Option>
            </Select>
          </Box>
          <Box
            w={1}
          >
            <StoryAssociator
              storyId={storyId}
            />
          </Box>
          <Flex
            w={1}
          >

            <DeleteStoryButton
              storyId={storyId}
            />
          </Flex>

        </Flex>
      </Flex>
    )
  }

  bounce = true

  debounce = (func) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        2000
      )
    }
  }

  constructor(props){
    super(props)
    this.state = {
      ...this.createStateFromProps(props)
    }
  }

  componentWillReceiveProps(nextProps){

    this.setState({
      ...this.createStateFromProps(nextProps)

    })
  }

  createStateFromProps = (props) => {
    if (
      props.story &&
      props.storyId !== this.state.id
    ) {
      let {
        story,
        story: {
          previewImage
        }
      } = props

      return {
        ...story,
        previewImageId: previewImage ? previewImage.id : ""
      }
    }
  }

  handleGroupSelectionSave = async (selectedGroupIds) => {
    try {
      this.props.setSaveStatus({
        synced: false
      })

      await this.props.editStory({
        setGroupsIds: selectedGroupIds
      })

      this.props.setSaveStatus({
        synced: true,
      })
    } catch (ex) {
      console.error(ex)
    }


  }

  handleSlugChange = (e) => {

    e.target.value = e.target.value.replace(/\s/g, '-')

    let name = e.target.name
    let value = e.target.value

    this.setState(
      ()=>({
        [name]: value,
      }),
      ()=>{
        this.props.setSaveStatus({
          synced: false,
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
      let {data : {editStory: {slug}}} = await this.props.editStory({
        slug: this.state.slug
      })

      this.setState({
        slugPending: false,
        slug
      })

      this.props.router.replace({
        pathname: this.props.router.pathname,
        query: {
          ...this.props.router.query,
          storySlug: slug
        }
      }, `/cms/${this.props.router.query.subdomain}/${slug}`)

    } catch (ex) {
      console.error(ex)
    }

  }

  handleChange = ({target: {value, name}}) => {
    this.setState(
      ()=>({
        [name]: value,
      }),
      ()=>{
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
        synced: true,
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  componentWillUnmount(){
    this.handleSave()
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
