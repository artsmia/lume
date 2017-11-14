import React, {Component} from 'react'
import styled from 'styled-components'
import {H2, H3} from '../../ui/h'
import {Label, Select, Option, Checkbox} from '../../ui/forms'
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
import {Search} from '../../ui/search'
import {Link} from '../../ui/links'

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
    details: [],
    bookSearch: ""
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
          books,
          refetch
        },
        orgSub,
        itemId,
        editItem
      },
      state: {
        snack,
        snackId,
        newRelatedBookIds,
        removeRelatedBookIds,
        availableBooks,
        reordering,
        selectedTab,
        bookSearch
      },
      onImageSave,
      addRelatedBooks,
      removeRelatedBooks,
      reorderDetails,
      handleChange,
      handleCheck
    } = this
    let sortedDetails = details.slice().sort( (a,b) => a.index - b.index)


    let filteredBooks = books.filter( ({id}) => {
      let found = relatedBooks.find( book => book.id === id)
      if (!found) {
        return true
      } else {
        return false
      }
    })

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
                    orgSub={orgSub}
                    imageId={(mainImage) ? mainImage.id : undefined}
                    onImageSave={onImageSave}
                  />
                </Column>
              </Row>
              <Row>
                <SectionContainer>
                  <H3>
                    Related Thematic Stories
                  </H3>
                  <Row>
                    <Column>
                      <Row>
                        <Search
                          name={"bookSearch"}
                          value={bookSearch}
                          onChange={handleChange}
                        />
                        <Button
                          onClick={()=>{
                            refetch({
                              bookFilter: {
                                limit: 20,
                                order: {
                                  column: "updatedAt",
                                  direction: "DESC"
                                }
                              },
                              bookSearch
                            })
                          }}
                        >
                          Search
                        </Button>
                      </Row>

                      <CheckContainer>
                        {relatedBooks.map( ({id, title}) => (
                          <CheckRow
                            key={id}
                          >
                            <Link
                              href={{
                                pathname: "/cms/edit/book",
                                query: {
                                  orgSub,
                                  bookId: id
                                }
                              }}
                              as={`/${orgSub}/cms/book/${id}`}
                            >
                              {title}
                            </Link>
                            <Checkbox
                              checked
                              name={id}
                              onChange={()=>{
                                editItem({
                                  variables: {
                                    itemId,
                                    removeRelatedBookIds: [id]
                                  }
                                })
                              }}
                            />
                          </CheckRow>
                        ))}
                        {filteredBooks.map( ({id, title}) => (
                          <CheckRow
                            key={id}
                          >
                            <Link
                              href={{
                                pathname: "/cms/edit/book",
                                query: {
                                  orgSub,
                                  bookId: id
                                }
                              }}
                              as={`/${orgSub}/cms/book/${id}`}
                            >
                              {title}
                            </Link>
                            <Checkbox
                              name={id}
                              onChange={()=>{
                                editItem({
                                  variables: {
                                    itemId,
                                    newRelatedBookIds: [id]
                                  }
                                })
                              }}
                            />
                          </CheckRow>
                        ))}
                      </CheckContainer>

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
                          orgSub={orgSub}
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

    }
  }


  change = ({target: {name, value}}) => this.setState({[name]: value})


  handleChange = ({target: {value, name}}) => this.setState({[name]: value})


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



}

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
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
  padding: 20px;
  border: 1px solid ${({theme}) => theme.colors.black};
`

const CheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 300px;
  width: 600px;
  border: 1px solid black;
  overflow-y: scroll;
  padding: 20px;
  margin: 10px 0;
`

const CheckRow = styled.div`
  height: 40px;
`
