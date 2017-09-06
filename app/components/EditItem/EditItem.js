import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../CMSTemplate'
import {EditContainer} from '../CMSTemplate/Template'
import {H2} from '../../ui/h'
import {Form, Label, Input, TextArea} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import {PreviewAppItem} from '../AppItem'
import DetailEditor from '../DetailEditor'
import PropTypes from 'prop-types'
import Snackbar from '../../ui/Snackbar'
import {ExpanderContainer} from '../../ui/expander'
import ImageManager from '../ImageManager'
import Modal from '../../ui/modal'
import router from 'next/router'

export default class EditItem extends Component {

  static propTypes = {
    editItem: PropTypes.func,
    editOrCreateDetail: PropTypes.func,
    data: PropTypes.object
  }


  state = {
    upload: true,
    snack: "",
    snackId: "",
    deleteItemModal: false,
    title: "",
    attribution: "",
    medium: "",
    dimensions: "",
    culture: "",
    accessionNumber: "",
    text: "",
    creditLine: "",
    currentLocation: ""
  }



  render() {


    if (this.props.data.loading) return null

    const {
      addDetail,
      state,
      inputs,
      change,
      saveItem,
      props: {
        data: {
          organization: {
            id: orgId,
            images
          },
          item: {
            mainImage,
            details
          }
        }
      },
      state: {
        snack,
        snackId,
        deleteItemModal,
        title,
        attribution,
        date,
        medium,
        dimensions,
        culture,
        accessionNumber,
        text,
        creditLine,
        currentLocation
      },
      onImageSave,
      deleteItem
    } = this
    return (
      <Template
        {...this.props}
      >
        <Snackbar
          message={snack}
          snackId={snackId}
        />
        <EditContainer>
          <TabContainer
            initialTab={"edit"}
          >
            <TabHeader>
              <Tab
                name={"edit"}
              >
                Edit
              </Tab>
              <Tab
                name={"preview"}
              >
                Preview
              </Tab>
            </TabHeader>
            <TabBody
              name={"edit"}
            >
              <Row>
                <Column>
                  <Row>
                    <SectionContainer>
                      <H2>Information</H2>
                      <Row>
                        <Column>
                          <Label>Title</Label>
                          <Input
                            name={"title"}
                            value={title}
                            onChange={change}
                          />
                          <Label>Date</Label>
                          <Input
                            name={"date"}
                            value={date}
                            onChange={change}
                          />
                          <Label>Culture</Label>
                          <Input
                            name={"culture"}
                            value={culture}
                            onChange={change}
                          />
                          <Label>Dimensions</Label>
                          <Input
                            name={"dimensions"}
                            value={dimensions}
                            onChange={change}
                          />
                          <Label>Culture</Label>
                          <Input
                            name={"accessionNumber"}
                            value={accessionNumber}
                            onChange={change}
                          />
                        </Column>
                        <Column>
                          <Label>Attribution</Label>
                          <TextArea
                            name={"attribution"}
                            value={attribution}
                            onChange={change}
                          />
                          <Label>Medium</Label>
                          <TextArea
                            name={"medium"}
                            value={medium}
                            onChange={change}
                          />
                          <Label>Credit Line</Label>
                          <TextArea
                            name={"creditLine"}
                            value={creditLine}
                            onChange={change}
                          />
                          <Label>Current Location</Label>
                          <TextArea
                            name={"creditLine"}
                            value={creditLine}
                            onChange={change}
                          />
                        </Column>
                      </Row>
                      <Label>
                        About
                      </Label>
                      <TextArea
                        name={"text"}
                        value={text}
                        onChange={change}
                      />
                      <Row>
                        <Button
                          onClick={saveItem}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={()=>this.setState({deleteItemModal: true})}
                          color={"red"}
                        >
                          Delete this Item
                        </Button>
                        <Modal
                          open={deleteItemModal}
                          onClose={()=>this.setState({deleteItemModal: false})}
                          footer={(
                            <Button
                              onClick={deleteItem}
                              color={"red"}
                            >
                              Delete Item
                            </Button>
                          )}
                        >
                          Do you want to delete this item?
                        </Modal>
                      </Row>
                    </SectionContainer>
                  </Row>


                </Column>
                <Column>
                  <H2>
                    Main Image
                  </H2>
                  <ImageManager
                    orgId={orgId}
                    imageId={(mainImage) ? mainImage.id : undefined}
                    onImageSave={onImageSave}
                  />
                </Column>
              </Row>
              <Row>
                <SectionContainer>
                  <H2>
                    Details
                  </H2>
                  <ExpanderContainer>
                    { (details) ?
                      details.map( detail => (
                        <DetailEditor
                          key={detail.id}
                          detailId={detail.id}
                          orgId={orgId}
                        />
                      ))
                      : null
                    }
                    <Button
                      onClick={addDetail}
                      color={"white"}
                    >
                      Add Detail
                    </Button>
                  </ExpanderContainer>

                </SectionContainer>
              </Row>


            </TabBody>
            <TabBody
              name={"preview"}
            >
              {/* <PreviewAppItem
                data={{
                  item: {
                    ...state,
                    mainImage: {
                      id: (mainImage) ? mainImage.id : false
                    }
                  }
                }}
              /> */}
            </TabBody>
          </TabContainer>
        </EditContainer>
      </Template>
    )
  }

  componentWillReceiveProps(newProps){
    if (!newProps.data.loading) {
      Object.keys(newProps.data.item).forEach( key => {
        this.setState({
          [key]: newProps.data.item[key] || ""
        })
      })
    }
  }


  change = ({target: {name, value}}) => this.setState({[name]: value})

  onImageSave = async (selectedImageId) => {
    try {
      const {
        props: {
          editItem,
          data: {
            item: {
              id: itemId
            }
          }
        }

      } = this
      await editItem({
        variables: {
          itemId,
          mainImageId: selectedImageId
        }
      })

      this.setState({
        snack: "Image Selection Saved",
        snackId: Math.random()
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  saveItem = async () => {
    try {
      const {
        state: {
          attribution,
          title,
          localId,
          medium,
          date,
          culture,
          accessionNumber,
          currentLocation,
          creditLine,
          text,
        },
        props: {
          data: {
            item: {
              id: itemId
            }
          },
          editItem
        }
      } = this

      await editItem({
        variables: {
          itemId,
          attribution,
          title,
          localId,
          medium,
          date,
          accessionNumber,
          currentLocation,
          creditLine,
          text,
          culture
        }
      })

      this.setState({
        snack: "Saved",
        snackId: Math.random()
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  addDetail = async () => {
    try {
      const {
        data: {
          item,
          item: {
            id: createDetailItemId,
            mainImage
          }
        },
        editItem
      } = this.props


      const data = await editItem({
        variables: {
          itemId: item.id,
          createDetailItemId,
          createDetailImageId: (mainImage) ? mainImage.id : undefined
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }


  deleteItem = async () => {
    try {

      const {
        props: {
          deleteItem,
          data: {
            item: {
              id: itemId
            }
          },
          orgSub
        }
      } = this

      await deleteItem({
        variables: {
          itemId
        }
      })


      router.push({
        pathname: '/cms/browse/items',
        query: {
          orgSub,
        }
      }, `/${orgSub}/cms/items`)


    } catch (ex) {
      console.error(ex)
    }
  }

}


const SectionContainer = styled(Column)`
  margin: 20px;
  padding: 10px;
  border: 1px solid ${({theme}) => theme.colors.black};
`
