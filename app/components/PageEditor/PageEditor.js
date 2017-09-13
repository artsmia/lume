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

export default class extends Component {

  state = {
    title: "",
    text: "",
    imageModal: false,
    snackMessage: "",
    snackId: ""
  }

  render () {
    if (this.props.data.loading) return null

    const {
      state: {
        title,
        text,
        type,
        imageModal,
        snackMessage,
        snackId,
        deleteModal
      },
      save,
      handleChange,
      handleImageSave,
      deletePage
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
            {/* <Image
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
            </Modal> */}
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
          </Column>
          <Column>

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

      console.log(response)

      this.setState({
        imageModal: false,
        snackId: Math.random(),
        snackMessage: "Page Saved"
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
