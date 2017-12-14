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

export default class ObjEditor extends Component {

  static defaultProps = {
    objId: PropTypes.string.isRequired,
  }

  state = {
    modalOpen: false,
  }

  stringFields = [
    "title",
    "localId",
    "medium",
    "dimensions",
    "attribution",
    "date",
    "culture",
    "acccessionNumber",
    "currentLocation",
    "creditLine",
    "description",
  ]

  constructor(props){
    super(props)
    let initialState = {}
    this.stringFields.forEach( field => initialState[field] = "")
    this.state = initialState

  }

  render() {

    if (!this.props.obj) return null

    const {
      props: {
        obj: {
          primaryImage
        }
      },
      state,
      state: {
        modalOpen,
      },
      handleChange,
      handleModalClose,
      openModal,
      handleImageSave,
      stringFields,
      handleSave
    } = this

    return (
      <Container>
        <H3>
          Obj Editor
        </H3>
        {stringFields.map( field => (
          <div
            key={field}
          >
            <Label>{field}</Label>
            <Input
              name={field}
              value={state[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <Button
          onClick={handleSave}
        >
          Save
        </Button>

        <Label>
          Primary Image
        </Label>
        <Image
          imageId={(primaryImage) ? primaryImage.id : false}
        />
        <Button
          onClick={openModal}
        >
          Change
        </Button>



        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          header={`Edit Preview Image`}
          width={"60%"}

        >
          <ImageManager
            subdomain={this.props.subdomain}
            onImageSave={handleImageSave}
          />

        </Modal>



      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    if (
      (
        !this.state.objId &&
        nextProps.obj
      ) || (
        this.state.objId !== nextProps.objId &&
        nextProps.obj.id === nextProps.objId
      )
    ){

      this.setState({
        objId: nextProps.objId,
      })

      this.stringFields.forEach( field => this.setState({[field]: nextProps.obj[field] || ""}))
    }


  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  openModal = () => {
    this.setState({
      modalOpen: true
    })
  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  handleImageSave = (primaryImageId) => {

    const {
      props: {
        objId,
        editObj
      }
    } = this

    editObj({
      objId,
      primaryImageId
    })
    this.setState({modalOpen: false})
  }

  handleSave = () => {
    const {
      props: {
        editObj,
        objId
      },
      stringFields,
      state
    } = this

    let variables = {
      objId
    }

    stringFields.forEach( field => variables[field] = state[field])

    editObj(variables)


  }

}

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
`
