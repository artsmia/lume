import React, {Component} from 'react'
import styled from 'styled-components'
import {H2, H3} from '../../ui/h'
import {Label, Select, Option} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import AppItem from '../AppItem'
import DetailEditor from '../DetailEditor'
import PropTypes from 'prop-types'
import Snackbar from '../../ui/Snackbar'
import {ExpanderContainer} from '../../ui/expander'
import ImageManager from '../ImageManager'
import Sorter from '../../ui/drag/Sorter'
import {Loading} from '../../ui/spinner'
import ItemSettingsEditor from '../ItemSettingsEditor'
import ItemBasicEditor from '../ItemBasicEditor'


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
    pullFromCustomApi: false,
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
        newRelatedBookIds,
        removeRelatedBookIds,
        availableBooks,
        reordering,
        selectedTab,
      },
      onImageSave,
      addRelatedBooks,
      removeRelatedBooks,
      reorderDetails,
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
                onClick={()=>this.setState({selectedTab: "edit"})}
              >
                Edit
              </Tab>
              <Tab
                name={"preview"}
                onClick={()=>this.setState({selectedTab: "preview"})}
              >
                Preview
              </Tab>
            </TabHeader>
            <TabBody
              name={"edit"}
            >
              <Row>
                <Column>
                  <ItemSettingsEditor
                    itemId={itemId}
                  />
                  <ItemBasicEditor
                    itemId={itemId}

                  />


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
                  <DetailHeader>
                    <H2>
                      Details
                    </H2>
                    <Button
                      onClick={()=>this.setState(({reordering}) => ({reordering: !reordering}))}
                    >
                      {(reordering) ? "Done" : "Reorder Details"}
                    </Button>
                  </DetailHeader>

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

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`

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
