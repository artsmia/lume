import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import {Button} from '../../ui/buttons'
import Modal from '../../ui/modal'
import Image from '../../shared/Image'
import {Input, Textarea, Label} from '../../ui/forms'
import ImageManager from '../ImageManager'
import router from 'next/router'

export default class ComparisonEditor extends Component {

  static defaultProps = {
    onSelect: PropTypes.func.isRequired,
    contentId: PropTypes.string.isRequired,

  }

  state = {
    title: "",
    description: "",
    modalOpen: false,
    editImage: ""
  }

  render() {

    if (!this.props.comparison) return null

    const {
      props: {
        comparison,
        comparison: {
          comparisonImage0,
          comparisonImage1
        }
      },
      state: {
        title,
        description,
        modalOpen,
        editImage
      },
      handleChange,
      handleModalClose,
      openModal,
      handleComparisonImageSave
    } = this

    return (
      <Container>
        <H3>
          Comparison Editor
        </H3>
        <Label>Title</Label>
        <Input
          name={"title"}
          value={title}
          onChange={handleChange}
        />
        <Label>Description</Label>
        <Textarea
          name={"description"}
          value={description}
          onChange={handleChange}
        />
        <Button
          onClick={()=>{
            this.props.editComparison({
              title,
              description
            })
          }}
        >
          Save
        </Button>

        <Label>
          Image 1
        </Label>
        <Image
          imageId={(comparisonImage0) ? comparisonImage0.id : false}
        />
        <Button
          onClick={()=>openModal("comparisonImage0Id")}
        >
          Change
        </Button>

        <Label>
          Image 2
        </Label>
        <Image
          imageId={(comparisonImage1) ? comparisonImage1.id : false}
        />
        <Button
          onClick={()=>openModal("comparisonImage1Id")}
        >
          Change
        </Button>


        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          header={`Edit comparisonImage${editImage}`}
          width={"60%"}

        >
          <ImageManager
            subdomain={router.query.subdomain}
            onImageSave={handleComparisonImageSave}
          />

        </Modal>



      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    if (
      !this.props.comparison &&
      nextProps.comparison
    ){
      this.setState({
        title: nextProps.comparison.title || "",
        description: nextProps.comparison.description || "",
      })
    }
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  openModal = (editImage) => {
    this.setState({
      editImage,
      modalOpen: true
    })
  }

  handleModalClose = () => {
    this.setState({
      editImage: "",
      modalOpen: false
    })
  }

  handleComparisonImageSave = (imageId) => {
    this.props.editComparison({
      [this.state.editImage]: imageId,
    })
    this.setState({modalOpen: false})
  }


}

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
`
