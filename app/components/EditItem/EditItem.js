import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../Template'
import {H2, H3} from '../../ui/h'
import {Label, Input, TextArea, Select, Option, Checkbox} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import AppItem from '../AppItem'
import DetailEditor from '../DetailEditor'
import PropTypes from 'prop-types'
import Snackbar from '../../ui/Snackbar'
import {ExpanderContainer} from '../../ui/expander'
import ImageManager from '../ImageManager'
import Modal from '../../ui/modal'
import router from 'next/router'
import Sorter from '../../ui/drag/Sorter'
import {Loading} from '../../ui/spinner'

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
    date: "",
    attribution: "",
    localId: "",
    medium: "",
    dimensions: "",
    culture: "",
    accessionNumber: "",
    text: "",
    pullFromCustomApi: false,
    creditLine: "",
    currentLocation: "",
    newRelatedBookIds: [],
    removeRelatedBookIds: [],
    availableBooks: [],
    reordering: false,
    selectedTab: "edit",
    details: []
  }



  render() {


    if (
      this.props.data.loading ||
      !this.props.data.item
    ) return <Loading/>

    const {
      addDetail,
      change,
      saveItem,
      multiChange,
      props: {
        data: {
          organization,
          item: {
            mainImage,
            relatedBooks,
            details
          },
        },
        orgSub,
        itemId
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
        newRelatedBookIds,
        removeRelatedBookIds,
        availableBooks,
        reordering,
        selectedTab,
        currentLocation,
        pullFromCustomApi,
        localId
      },
      onImageSave,
      deleteItem,
      addRelatedBooks,
      removeRelatedBooks,
      reorderDetails,
      checkboxChange,
    } = this
    let sortedDetails = details.slice().sort( (a,b) => a.index - b.index)
    return (
      <Container>
        <Snackbar
          message={snack}
          snackId={snackId}
        />
        <EditContainer>
          <TabContainer
            selectedTab={selectedTab}
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
                          <Label>Accession Number</Label>
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
                            name={"currentLocation"}
                            value={currentLocation}
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
                        <Column>
                          <Label>
                            Pull Values From Custom API
                          </Label>
                          <Checkbox
                            name={"pullFromCustomApi"}
                            checked={pullFromCustomApi}
                            onChange={checkboxChange}
                          />
                        </Column>
                        <Column>
                          <Label>Local ID</Label>
                          <Input
                            name={"localId"}
                            value={localId}
                            onChange={change}
                          />
                        </Column>
                      </Row>
                    </SectionContainer>
                  </Row>


                </Column>
                <Column>
                  <H2>
                    Main Image
                  </H2>
                  <ImageManager
                    orgId={organization.id}
                    imageId={(mainImage) ? mainImage.id : undefined}
                    onImageSave={onImageSave}
                  />
                </Column>
              </Row>
              <Row>
                <SectionContainer>
                  <H3>
                    Related Books
                  </H3>
                  <Row>
                    <Column>
                      <Label>
                        All Books
                      </Label>
                      <Select
                        name={"newRelatedBookIds"}
                        onChange={multiChange}
                        multiple
                        value={newRelatedBookIds}
                      >
                        {availableBooks.map( ({id, title}) => (
                          <Option
                            key={id}
                            value={id}
                          >
                            {title}
                          </Option>
                        ))}
                      </Select>
                      <Button
                        onClick={addRelatedBooks}
                      >
                        Add Related Books
                      </Button>
                    </Column>
                    <Column>
                      <Label>
                        Related Books
                      </Label>
                      <Select
                        name={"removeRelatedBookIds"}
                        onChange={multiChange}
                        multiple
                        value={removeRelatedBookIds}
                      >
                        {relatedBooks.map( ({id, title}) => (
                          <Option
                            key={id}
                            value={id}
                          >
                            {title}
                          </Option>
                        ))}
                      </Select>
                      <Button
                        onClick={removeRelatedBooks}
                      >
                        Remove Related Books
                      </Button>
                    </Column>
                  </Row>

                </SectionContainer>
              </Row>

              <Row>
                <SectionContainer>
                  <H2>
                    Details
                  </H2>
                  <Button
                    onClick={()=>this.setState(({reordering}) => ({reordering: !reordering}))}
                  >
                    {(reordering) ? "Done" : "Reorder Details"}
                  </Button>
                  <ExpanderContainer>
                    {
                      (sortedDetails && !reordering) ? sortedDetails.map( detail => (
                        <DetailEditor
                          key={detail.id}
                          detailId={detail.id}
                          orgId={organization.id}
                        />
                      )): null
                    }
                    {
                      (sortedDetails && reordering) ? (
                        <Sorter
                          sortables={sortedDetails}
                          onNewOrder={reorderDetails}
                        />
                      ): null
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
              {(selectedTab === "preview") ? (
                <AppItem
                  itemId={itemId}
                  orgSub={orgSub}
                />
              ): null}

            </TabBody>
          </TabContainer>
        </EditContainer>
      </Container>
    )
  }


  componentWillReceiveProps({data}){
    if (!data.loading && data.item) {
      Object.keys(data.item).forEach( key => {
        if (!Array.isArray(data.item[key])) {
          this.setState({
            [key]: (data.item[key] === null) ? "" : data.item[key]
          })
        }
      })


      let relatedBookIds = data.item.relatedBooks.map(({id}) => id)
      let availableBooks = data.books.filter( ({id}) => !relatedBookIds.includes(id))
      this.setState({availableBooks})
    }
  }


  change = ({target: {name, value}}) => this.setState({[name]: value})

  multiChange = (e) => {
    const {
      name,
      options
    } = e.target
    let values = [...options].filter(({selected}) => selected).map(({value}) => value)
    this.setState({[name]: values})
  }

  checkboxChange = ({target: {name, checked}}) => this.setState({[name]: checked})

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
          pullFromCustomApi,
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
          culture,
          pullFromCustomApi
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
          item: {
            id: itemId,
            mainImage
          }
        },
        editItem
      } = this.props

      await editItem({
        variables: {
          itemId: itemId,
          createDetailItemId: itemId,
          createDetailImageId: (mainImage) ? mainImage.id : undefined
        }
      })

      console.log("detail received")


    } catch (ex) {
      console.error(ex)
    }
  }


  reorderDetails = async (details) => {
    try {
      const {
        editDetail
      } = this.props

      await Promise.all(
        details.map(detail => editDetail({
          variables: {
            detailId: detail.id,
            index: detail.index
          }
        }))
      )
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

  addRelatedBooks = async () => {
    try {
      const {
        props: {
          itemId,
          editItem
        },
        state: {
          newRelatedBookIds
        }
      } = this


      await editItem({
        variables: {
          itemId,
          newRelatedBookIds
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }

  removeRelatedBooks = async () => {
    try {
      const {
        props: {
          itemId,
          editItem
        },
        state: {
          removeRelatedBookIds
        }
      } = this


      await editItem({
        variables: {
          itemId,
          removeRelatedBookIds
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`

const EditContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const SectionContainer = styled(Column)`
  margin: 20px;
  padding: 10px;
  border: 1px solid ${({theme}) => theme.colors.black};
`
