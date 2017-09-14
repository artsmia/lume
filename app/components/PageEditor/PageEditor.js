import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Column} from '../../ui/layout'
import ImageManager from '../ImageManager'
import {Button} from '../../ui/buttons'
import {s3Url} from '../../config'
import {Input, TextArea, Label, Select, Option} from '../../ui/forms'
import {ExpanderContainer, Expander} from '../../ui/expander'
import ClipEditor from '../ClipEditor'
import Image from '../Image'
import Modal from '../../ui/modal'
import Snackbar from '../../ui/Snackbar'
import {Vimeo} from '../../ui/video'

export default class extends Component {

  state = {
    title: "",
    text: "",
    video: "",
    imageModal: false,
    comparisonModal0: false,
    comparisonModal1: false,
    snackMessage: "",
    snackId: "",
    images: []
  }

  render () {
    if (this.props.data.loading) return null

    const {
      state: {
        title,
        text,
        type,
        imageModal,
        comparisonModal0,
        comparisonModal1,
        snackMessage,
        snackId,
        deleteModal,
        video,
        comparisonImages,
        mainImage,
      },
      save,
      handleChange,
      handleImageSave,
      deletePage,
      props: {
        orgId
      },
    } = this
    return (
      <Expander
        header={(
          <Row>
            <Column>
              <Label>Page Title</Label>
              <Input
                name={"title"}
                value={title}
                onChange={handleChange}
              />
            </Column>
            <Snackbar
              snackId={snackId}
              message={snackMessage}
            />
            <Button
              color={"red"}
              onClick={()=>this.setState({deleteModal: true})}
            >
              Delete Page
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
                    onClick={deletePage}
                    color={"red"}
                  >
                    Delete Page
                  </Button>
                </Row>
              )}
            >
              Do you want to delete this page?
            </Modal>
            <Button
              onClick={save}
            >
              Save Page
            </Button>
          </Row>
        )}
      >
        <Row>
          <Column>
            <Label>
              Text
            </Label>
            <TextArea
              name={"text"}
              value={text}
              onChange={handleChange}
            />
            <Label>
              Type
            </Label>
            <Select
              name={"type"}
              value={type}
              onChange={handleChange}
            >
              <Option
                value={"image"}
              >
                image
              </Option>
              <Option
                value={"video"}
              >
                video
              </Option>
              <Option
                value={"comparison"}
              >
                comparison
              </Option>
            </Select>

            {(type === "image") ? (
              <Row>
                <Image
                  imageId={(mainImage) ? mainImage.id : false}
                  height={"50px"}
                  quality={"s"}
                />
                <Button
                  onClick={()=>this.setState({imageModal: true})}
                  color={"white"}
                >
                  Change Main Image
                </Button>
                <Modal
                  open={imageModal}
                  onClose={()=>this.setState({imageModal: false})}
                  header={"Change Page Image"}
                >
                  <ImageManager
                    imageId={(mainImage) ? mainImage.id : false}
                    orgId={orgId}
                    onImageSave={handleImageSave}
                  />
                </Modal>
              </Row>
            ): null}

            {(type === "comparison") ? (
              <Row>
                <Image
                  imageId={(comparisonImages[0]) ? comparisonImages[0].id : false}
                  height={"50px"}
                  quality={"s"}
                />
                <Button
                  onClick={()=>this.setState({comparisonModal0: true})}
                  color={"white"}
                >
                  Change Comparison Image
                </Button>
                <Modal
                  open={comparisonModal0}
                  onClose={()=>this.setState({comparisonModal0: false})}
                  header={"Change Page Comparison Image"}
                >
                  <ImageManager
                    imageId={(comparisonImages[0]) ? comparisonImages[0].id : false}
                    orgId={orgId}
                    onImageSave={(imageId) => {
                      handleImageSave(imageId, 0)
                    }}
                  />
                </Modal>
                <Image
                  imageId={(comparisonImages[1]) ? comparisonImages[1].id : false}
                  height={"50px"}
                  quality={"s"}
                />
                <Button
                  onClick={()=>this.setState({comparisonModal1: true})}
                  color={"white"}
                >
                  Change Comparison Image
                </Button>
                <Modal
                  open={comparisonModal1}
                  onClose={()=>this.setState({comparisonModal1: false})}
                  header={"Change Page Comparison Image"}
                >
                  <ImageManager
                    imageId={(comparisonImages[1]) ? comparisonImages[1].id : false}
                    orgId={orgId}
                    onImageSave={(imageId) => {
                      handleImageSave(imageId, 1)
                    }}
                  />
                </Modal>

              </Row>
            ): null}

            {(type === "video") ? (
              <Column>
                <Label>
                  Video URL
                </Label>
                <Input
                  name={"video"}
                  value={video}
                  onChange={handleChange}
                />
              </Column>
            ): null}


          </Column>
          <Column>
            {(type === "video" && video.includes("vimeo.com/")) ? (
              <Vimeo
                url={video}
              />
            ): null}
          </Column>
        </Row>
      </Expander>
    )
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.data.loading) {
      const {
        page
      } = nextProps.data

      let keys = Object.keys(page)

      keys.forEach( key => {
        this.setState({
          [key]: page[key] || ""
        })
      })

    }
  }


  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  save = async () => {
    try {
      const {
        props: {
          editOrCreatePage,
          pageId,
        },
        state: {
          title,
          text,
          type,
          video
        }
      } = this


      const response = await editOrCreatePage({
        variables: {
          pageId,
          title,
          text,
          type,
          video
        }
      })


      this.setState({
        imageModal: false,
        snackId: Math.random(),
        snackMessage: "Page Saved"
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  handleImageSave = async(imageId, comparisonIndex) => {
    try {
      const {
        props: {
          editOrCreatePage,
          pageId,
        },
        state: {
          type,
          comparisonImages,
          text,
          title
        }
      } = this

      if (type === "image") {
        await editOrCreatePage({
          variables: {
            pageId,
            mainImageId: imageId,
            type,
            text,
            title
          }
        })
      }

      if (type === "comparison") {

        let comparisonImageIds = comparisonImages.map( ({id}) => id)

        comparisonImageIds[comparisonIndex] = imageId

        await editOrCreatePage({
          variables: {
            pageId,
            comparisonImageIds,
            type,
            text,
            title
          }
        })
      }


      this.setState({
        imageModal: false,
        snackId: Math.random(),
        snackMessage: "Page Image Changed"
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  openImageModal = () => this.setState({imageModal: true})


  deletePage = async () => {
    try {
      const {
        pageId,
        deletePage,
        data: {
          refetch
        }
      } = this.props

      this.setState({deleteModal: false})

      await deletePage({
        variables: {
          pageId
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }

}
