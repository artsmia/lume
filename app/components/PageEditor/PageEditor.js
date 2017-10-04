import React, {Component} from 'react'
import {Row, Column} from '../../ui/layout'
import ImageManager from '../ImageManager'
import {Button} from '../../ui/buttons'
import {Input, TextArea, Label, Select, Option} from '../../ui/forms'
import  {Expander} from '../../ui/expander'
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
    snackMessage: "",
    snackId: "",
    images: [],
    expanded: false,
    type: "image"
  }

  render () {
    if (this.props.data.loading) return null

    const {
      state,
      state: {
        title,
        text,
        type,
        imageModal,
        snackMessage,
        snackId,
        deleteModal,
        video,
        mainImage,
        expanded,
        mainImageSelection,
        comparisonImage0,
        comparisonImage1,
        comparisonModal0,
        comparisonModal1,
        comparisonImage0Selection,
        comparisonImage1Selection
      },
      save,
      handleChange,
      handleImageSave,
      handleComparisonImageSave,
      deletePage,
      props: {
        orgId,
      },
    } = this
    return (
      <Expander
        expanded={expanded}
        onArrowClick={()=>this.setState(({expanded}) => ({expanded: !expanded}))}
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
              {/* <Option
                value={"comparison"}
              >
                comparison
              </Option> */}
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
                  width={"60%"}
                >
                  <ImageManager
                    imageId={(mainImageSelection) ? mainImageSelection :""}
                    orgId={orgId}
                    onImageSave={(mainImageSelection)=>this.setState({mainImageSelection})}
                  />
                  <Button
                    onClick={()=>handleImageSave(mainImageSelection)}
                  >
                    Save Image
                  </Button>
                </Modal>
              </Row>
            ): null}

            {(type === "comparison") ? (
              <Row>
                  <Column>
                    <Image
                      imageId={(comparisonImage0) ? comparisonImage0.id : false}
                      height={"50px"}
                      quality={"s"}
                    />
                    <Button
                      onClick={()=>this.setState({comparisonModal0: true})}
                      color={"white"}
                    >
                      Change
                    </Button>
                  </Column>
                  <Column>
                    <Image
                      imageId={(comparisonImage1) ? comparisonImage1.id : ""}
                      height={"50px"}
                      quality={"s"}
                    />
                    <Button
                      onClick={()=>this.setState({comparisonModal1: true})}
                      color={"white"}
                    >
                      Change
                    </Button>
                  </Column>
                  <Modal
                    open={comparisonModal0}
                    onClose={()=>this.setState({comparisonModal0: ""})}
                    header={"Change Comparison Image"}
                    width={"60%"}
                  >
                    <ImageManager
                        imageId={comparisonImage0Selection}
                      orgId={orgId}
                      onImageSave={(comparisonImage0Selection)=>this.setState({comparisonImage0Selection})}
                    />
                    <Button
                      onClick={handleComparisonImageSave}
                    >
                      Save Image
                    </Button>
                  </Modal>
                  <Modal
                    open={comparisonModal1}
                    onClose={()=>this.setState({comparisonModal0: false})}
                    header={"Change Comparison Image"}
                    width={"60%"}
                  >
                    <ImageManager
                        imageId={comparisonImage1Selection}
                      orgId={orgId}
                      onImageSave={(comparisonImage1Selection)=>this.setState({comparisonImage1Selection})}
                    />
                    <Button
                      onClick={handleComparisonImageSave}
                    >
                      Save Image
                    </Button>
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


      let comparisonImage0 = page.comparisonImages.find(image => image.index === 0)

      if (comparisonImage0){
        this.setState({comparisonImage0})
      }

      let comparisonImage1 = page.comparisonImages.find(image => image.index === 1)

      if (comparisonImage1){
        this.setState({comparisonImage1})
      }


    }
    if (!nextProps.data.page.title){
      this.setState({expanded: true})
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

  handleComparisonImageSave = async () => {
    try {

      const {
        state: {
          comparisonImage0,
          comparisonImage1,
          comparisonImage0Selection,
          comparisonImage1Selection

        },
        props: {
          editOrCreatePage,
          pageId
        }
      } = this

      await editOrCreatePage({
        variables: {
          pageId,
          comparisonImages: [
            {
              id: (comparisonImage0Selection) ? comparisonImage0Selection : comparisonImage0.id,
              index: 0,
            },
            {
              id: (comparisonImage1Selection) ? comparisonImage1Selection : comparisonImage1.id,
              index: 1
            }
          ]
        }
      })

      this.setState({
        comparisonModal0: false,
        comparisonModal1: false
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  handleImageSave = async(imageId) => {
    try {
      const {
        props: {
          editOrCreatePage,
          pageId,
        },
        state: {
          type,
          text,
          title
        }
      } = this

      await editOrCreatePage({
        variables: {
          pageId,
          mainImageId: imageId,
          type,
          text,
          title
        }
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
