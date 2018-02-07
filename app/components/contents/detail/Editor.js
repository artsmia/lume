import React, {Component} from 'react'
import {Input, Textarea, ChangeImage, DetailSelector, MultiImage} from '../../cms/DefaultEditors'
import query from '../../../apollo/queries/content'
import mutation from '../../../apollo/mutations/editContent'
import setSaveStatus from '../../../apollo/local/setSaveStatus'
import {compose} from 'react-apollo'
import styled from 'styled-components'
import {H2} from '../../ui/h'
import {Button} from '../../ui/buttons'
import {Row, Column} from '../../ui/layout'

class DetailEditor extends Component {


  state = {
    title: "",
    description: "",
    geometry: null,
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
          additionalImages
        }
      },
      handleChange,
      handleAddAdditionalImage,
      handleRemoveAdditionalImage
    } = this

    return(
      <Container>
        <TopBar>

          <H2>
            Edit Detail
          </H2>

        </TopBar>
        <Row>
          <Column>
            <Input
              label={"Title"}
              value={title}
              name={"title"}
              onChange={handleChange}
            />
            <Textarea
              label={"Description"}
              value={description}
              name={"description"}
              onChange={handleChange}
            />
            <MultiImage
              label={"Additional Images"}
              additionalImages={additionalImages}
              onAdd={handleAddAdditionalImage}
              onRemove={handleRemoveAdditionalImage}
            />
          </Column>
          <Column>
            <ChangeImage
              label={"Image"}
              value={image0Id}
              name={"image0Id"}
              onChange={handleChange}
            />
            <DetailSelector
              label={"Selection"}
              value={geometry}
              name={"geometry"}
              onChange={handleChange}
              detailImageId={image0Id}
            />
          </Column>

        </Row>
      </Container>
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
      await this.props.editContent({
        ...this.state,
      })

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

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: flex-start;
  overflow-y:scroll;
  padding: 15px;
  box-sizing:border-box;
`

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: space-between;
`

let ExportComponent = DetailEditor

ExportComponent = compose(query, mutation)(DetailEditor)
ExportComponent = compose(setSaveStatus)(ExportComponent)

export default ExportComponent
