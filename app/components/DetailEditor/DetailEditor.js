import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Column} from '../../ui/layout'
import ImageManager from '../ImageManager'
import {Button} from '../../ui/buttons'
import {Input, Label} from '../../ui/forms'
import {ExpanderContainer, Expander} from '../../ui/expander'
import ClipEditor from '../ClipEditor'
import Image from '../Image'
import Modal from '../../ui/modal'
import Snackbar from '../../ui/Snackbar'
import Sorter from '../../ui/drag/Sorter'
import PropTypes from 'prop-types'

export default class DetailEditor extends Component {

  static displayName = "DetailEditor"

  static propTypes = {
    orgId: PropTypes.string,
    detailId: PropTypes.string.isRequired,
    data: PropTypes.object,
    editClip: PropTypes.func.isRequired,
    editOrCreateDetail: PropTypes.func.isRequired
  }

  state = {
    detailTitle: "",
    imageModal: false,
    snackMessage: "",
    snackId: "",
    reordering: false,
    clips: []
  }

  render () {
    if (this.props.data.loading) return null

    const {
      newClip,
      props: {
        data: {
          detail: {
            image,
          }
        },
        orgId
      },
      state: {
        detailTitle,
        imageModal,
        snackMessage,
        snackId,
        deleteModal,
        reordering,
        clips
      },
      save,
      handleChange,
      handleImageSave,
      deleteDetail,
      reorderClips
    } = this

    return (
      <Expander
        header={(
          <Row>
            <Column>
              <Label>Detail Title</Label>
              <Input
                name={"detailTitle"}
                value={detailTitle}
                onChange={handleChange}
              />
            </Column>
            <Image
              imageId={(image) ? image.id : false}
              height={"50px"}
              quality={"s"}
            />
            <Button
              onClick={()=>this.setState({imageModal: true})}
              color={"white"}
            >
              Change Image
            </Button>
            <Modal
              open={imageModal}
              onClose={()=>this.setState({imageModal: false})}
              header={"Change Detail Image"}
            >
              <ImageManager
                imageId={(image) ? image.id : false}
                orgId={orgId}
                onImageSave={handleImageSave}
              />
            </Modal>
            <Snackbar
              snackId={snackId}
              message={snackMessage}
            />
            <Button
              color={"red"}
              onClick={()=>this.setState({deleteModal: true})}
            >
              Delete Detail
            </Button>
            <Modal
              open={deleteModal}
              onClose={()=>this.setState({deleteModal: false})}
              footer={(
                <Row>
                  <Button>
                    Cancel
                  </Button>
                  <Button
                    onClick={deleteDetail}
                    color={"red"}
                  >
                    Delete Detail
                  </Button>
                </Row>
              )}
            >
              Do you want to delete this detail?
            </Modal>
            <Button
              onClick={save}
            >
              Save Detail
            </Button>
          </Row>
        )}
      >
        <Row>
          <Column>
            <ExpanderContainer>
              <Button
                onClick={()=>this.setState(({reordering}) => ({reordering: !reordering}))}
              >
                {(reordering) ? "Done" : "Reorder Clips"}
              </Button>
              {(!reordering) ? clips.map( clip => (
                <ClipEditor
                  key={clip.id}
                  clipId={clip.id}
                  orgId={orgId}
                />
              )):null}
              {(reordering) ? (
                <Sorter
                  sortables={clips}
                  onNewOrder={reorderClips}
                />
              ): null}
              <Button
                color={"white"}
                onClick={newClip}
              >
                New Clip
              </Button>
            </ExpanderContainer>

          </Column>
        </Row>
      </Expander>
    )
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.data.loading) {
      this.setState({detailTitle: nextProps.data.detail.title || ""})
      let clips = nextProps.data.detail.clips.slice()
      clips = clips.sort((a,b) => a.index - b.index)
      this.setState({clips})
    }
  }

  reorderClips = async (clips) => {
    try {
      const {
        editClip
      } = this.props



      await Promise.all(
        clips.map(clip => editClip({
          variables: {
            clipId: clip.id,
            index: clip.index
          }
        }))
      )

    } catch (ex) {
      console.error(ex)
    }
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  newClip = async () => {
    try {
      const {
        editOrCreateDetail,
        detailId,
      } = this.props

      let newClipDetailId = detailId

      await editOrCreateDetail({
        variables: {
          detailId,
          newClipDetailId: detailId
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
          editOrCreateDetail,
          detailId,
        },
        state: {
          detailTitle: title
        }
      } = this

      let newClipDetailId = detailId

      await editOrCreateDetail({
        variables: {
          detailId,
          title
        }
      })
    } catch (ex) {
      console.error(ex)
    }
  }

  handleImageSave = async(imageId) => {
    try {
      const {
        props: {
          editOrCreateDetail,
          detailId
        }
      } = this
      await editOrCreateDetail({
        variables: {
          detailId,
          imageId
        }
      })

      this.setState({
        imageModal: false,
        snackId: Math.random(),
        snackMessage: "Detail Image Changed"
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  openImageModal = () => this.setState({imageModal: true})


  deleteDetail = async () => {
    try {
      const {
        detailId,
        deleteDetail,
        data: {
          refetch
        }
      } = this.props

      this.setState({deleteModal: false})

      await deleteDetail({
        variables: {
          detailId
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }

}
