import React, {Component} from 'react'
import {ChangeImage, MultiImage, DetailSelector} from '../../cms/DefaultEditors'
import OrganizationQuery from '../../../apollo/queries/organization'
import {withRouter} from 'next/router'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import {compose} from 'react-apollo'
import styled from 'styled-components'
import {H2} from '../../mia-ui/text'
import {Button} from '../../mia-ui/buttons'
import getImageSrc from '../../../utils/getImageSrc'
import {Flex, Box} from 'grid-styled'
import {Title, Description} from '../../mia-ui/forms'


class DetailEditor extends Component {


  state = {
    title: "",
    description: "",
    geometry: {},
    image0Id: "",
  }

  render(){

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
              additionalImages={additionalImages.map(img => ({
                ...img,
                src: getImageSrc({
                  organization,
                  image: img,
                  quality: 'm'
                })
              }))}
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
              src={getImageSrc({
                organization,
                image: image0,
                quality: 'm'
              })}
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


  componentWillReceiveProps(nextProps){
    this.mapPropsToState(nextProps)
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
      this.props.setSaveStatus({
        saving: true
      })
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
        saving: false,
        synced: true,
        lastSave: Date.now()
      })
    } catch (ex) {
      console.error(ex)
    }

  }

  mapPropsToState = (nextProps) => {
    if (!nextProps.content || nextProps.contentId === this.state.id) return
    let {
      content
    } = nextProps
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

    this.setState({...state})
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

ExportComponent = compose(query, mutation)(DetailEditor)
ExportComponent = compose(setSaveStatus)(ExportComponent)
ExportComponent = compose(OrganizationQuery)(ExportComponent)
ExportComponent = withRouter(ExportComponent)

export default ExportComponent
