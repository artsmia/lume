import React, {Component} from 'react'
import {ChangeImage, MultiImage, DetailSelector} from '../../cms/DefaultEditors'
import OrganizationQuery from '../../../apollo/queries/organization'
import {withRouter} from 'next/router'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import {compose,withApollo} from 'react-apollo'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Button} from '../../mia-ui/buttons'
import {Flex, Box} from 'grid-styled'
import {Title, Description} from '../../mia-ui/forms'
import DeleteContentButton from '../../cms/DeleteContentButton'


class DetailEditor extends Component {

  render(){

    console.log(this.props)

    if (!this.props.content) return null

    const {
      state: {
        title,
        description,
        image0Id,
        geometry
      },
      saveEdits,
      props: {
        content,
        content: {
          additionalImages,
          image0
        },
        organization
      },
      handleChange,
      handleAddAdditionalImage,
      handleRemoveAdditionalImage
    } = this

    return(
      <Flex
        width={1}
        p={3}
      >
        <Flex
          width={1/2}
          flexWrap={'wrap'}
        >
          <Box
            w={1}
          >
            <Title
              name={'title'}
              value={title}
              onChange={handleChange}
              label={'Title'}
            />
          </Box>
          <Box
            w={1}
          >
            <Description
              name={'description'}
              value={description}
              onChange={handleChange}
              label={'Description'}
            />

          </Box>
          <Box
            w={1}
          >
            <MultiImage
              label={"Additional Images"}
              additionalImages={additionalImages}
              onAdd={handleAddAdditionalImage}
              onRemove={handleRemoveAdditionalImage}
            />
          </Box>
        </Flex>
        <Flex
          width={1/2}
          flexWrap={'wrap'}
        >
          <Box
            w={1}
          >
            <ChangeImage
              label={"Image"}
              name={"image0Id"}
              image={image0}

              onChange={handleChange}
            />
          </Box>
          <Box
            w={1}
          >
            <DetailSelector
              label={"Selection"}
              value={geometry}
              name={"geometry"}
              onChange={handleChange}
              detailImageId={image0Id}
            />
          </Box>

          <Box
            w={1}
            my={5}
          >
            <DeleteContentButton
              contentId={content.id}
            />
          </Box>

        </Flex>

      </Flex>






    )
  }

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        wait
      )
    }
  }

  constructor(props){
    super(props)
    this.state = {
      title: "",
      description: "",
      geometry: {},
      image0Id: "",
    }
    this.state = {
      ...this.stateFromProps(props)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({...this.stateFromProps(nextProps)})
  }

  handleChange = ({target: {value, name}}) => {
    this.props.setSaveStatus({
      synced: false
    })
    this.setState(
      ()=>({
        [name]: value,
      }),
      ()=>{
        this.debounce(this.saveEdits, 2000)
      }
    )
  }

  saveEdits = async () => {
    try {
      let edits = {
        ...this.state,
        image0Id: this.state.image0Id || undefined,
      }

      if (this.state.geometry.coordinates){
        Object.assign(edits, {
          geometry: this.state.geometry
        })
      }

      await this.props.editContent({...edits})

      this.props.setSaveStatus({
        synced: true,
      })
    } catch (ex) {
      console.error(ex)
    }

  }

  stateFromProps = (props) => {

    if (!props.content || props.contentId === this.state.id) return {}

    let {
      content
    } = props
    let state = {
      title: content.title || "",
      description: content.description || "",
      image0Id: (content.image0) ? content.image0.id : "",
      geometry: {
        ...content.geometry,
        __typename: undefined
      },
      id: content.id
    }

    return state
  }

  handleAddAdditionalImage = (addAdditionalImageId) => {
    this.props.editContent({
      addAdditionalImageId
    })
  }

  handleRemoveAdditionalImage = (removeAdditionalImageId) => {
    this.props.editContent({
      removeAdditionalImageId
    })
  }

}

let ExportComponent = DetailEditor

ExportComponent = compose(
  query,
  mutation,
  setSaveStatus,
  OrganizationQuery
)(DetailEditor)


ExportComponent = withRouter(ExportComponent)

export default ExportComponent
