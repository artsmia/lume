import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Column} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {s3Url} from '../../config'
import {Input, Label, TextArea} from '../../ui/forms'
import {Expander} from '../../ui/expander'
import Image from '../Image'
import ImageManager from '../ImageManager'
import Modal from '../../ui/modal'
import Snackbar from '../../ui/Snackbar'
import Zoomer from '../Zoomer'
import PropTypes from 'prop-types'

export default class ClipEditor extends Component {

  static displayName = "ClipEditor"

  static propTypes = {
    orgId: PropTypes.string,
    data: PropTypes.object,
    clipId: PropTypes.string.isRequired,
    editOrCreateClip: PropTypes.func.isRequired
  }

  state = {
    clipTitle: "",
    clipDescription: "",
    additionalImagesModal: false,
    snackMessage: "",
    snackId: "",
    deleteClipModal: false
  }

  render () {
    if (this.props.data.loading) return null

    const {
      props: {
        orgId,
        data: {
          clip: {
            id: clipId,
            detail: {
              id: detailId,
            },
            additionalImages,
            geometry
          }
        }
      },
      state: {
        clipTitle,
        clipDescription,
        additionalImagesModal,
        snackMessage,
        snackId,
        deleteClipModal
      },
      save,
      handleChange,
      openModal,
      handleAdditionalImageSave,
      deleteClip,
      saveGeometry
    } = this
    return (
      <Expander
        header={(
          <Row>
            <Column>
              <Label>Clip Title</Label>
              <Input
                name={"clipTitle"}
                value={clipTitle}
                onChange={handleChange}
              />
            </Column>
            <Button
              color={"red"}
              onClick={()=>this.setState({deleteClipModal: true})}
            >
              Delete Clip
            </Button>
            <Modal
              open={deleteClipModal}
              onClose={()=>this.setState({deleteClipModal: false})}
              footer={(
                <Row>
                  <Button
                    color={"red"}
                    onClick={deleteClip}
                  >
                    Delete Clip
                  </Button>
                </Row>
              )}
            >
              Are you sure you want to delete this clip?
            </Modal>
            <Button
              onClick={save}
            >
              Save Clip
            </Button>
          </Row>
        )}
      >
        <Row>
          <Column>
            <Label>Clip description</Label>
            <TextArea
              name={"clipDescription"}
              value={clipDescription}
              onChange={handleChange}
            />
            <Row>
              {additionalImages.map( image => (
                <Image
                  key={image.id}
                  imageId={image.id}
                  size={"50px"}
                  thumb
                />
              ))}
            </Row>
            <Button
              onClick={()=>this.setState({additionalImagesModal: true})}
            >
              New Additional Image
            </Button>
            <Modal
              onClose={()=>this.setState({additionalImagesModal: false})}
              header={"Add New Additional Image to Clip"}
              open={additionalImagesModal}
            >
              <ImageManager
                orgId={orgId}
                onImageSave={handleAdditionalImageSave}
              />
            </Modal>
            <Snackbar
              message={snackMessage}
              snackId={snackId}
            />
          </Column>
          <ZoomerContainer>
            {(detailId && clipId) ? (
              <Zoomer
                detailId={detailId}
                clipId={clipId}
                crop={true}
                onCrop={saveGeometry}
              />
            ) : null}
          </ZoomerContainer>
        </Row>


      </Expander>
    )
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.data.loading) {
      this.setState({
        clipTitle: nextProps.data.clip.title || "",
        clipDescription: nextProps.data.clip.description || ""
      })
    }
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})


  saveGeometry = async (geometry) => {
    try {
      const {
        props: {
          editOrCreateClip,
          clipId,
        },
      } = this

      await editOrCreateClip({
        variables: {
          clipId,
          geometry
        }
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  save = async () => {
    try {
      const {
        props: {
          editOrCreateClip,
          clipId,
        },
        state: {
          clipTitle: title,
          clipDescription: description
        }
      } = this


      await editOrCreateClip({
        variables: {
          clipId,
          title,
          description
        }
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  handleAdditionalImageSave = async (newAdditionalImageId) => {
    try {
      const {
        clipId,
        editOrCreateClip,
        data: {
          refetch
        }
      } = this.props


      await editOrCreateClip({
        variables: {
          clipId,
          newAdditionalImageIds: [newAdditionalImageId]
        }
      })

      await refetch()

      this.setState({
        imageModal: false,
        snackId: Math.random(),
        snackMessage: "Additional Clip Image Added"
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  openModal = () => this.setState({additionalImagesModal: true})

  deleteClip = async () => {
    try {
      const {
        clipId,
        deleteClip
      } = this.props

      this.setState({deleteClipModal: false})

      await deleteClip({
        variables: {
          clipId
        }
      })

    } catch (ex) {
      console.error(ex)
    }
  }

}

const ZoomerContainer = styled.div`
  display: flex;
  height: 500px;
`
