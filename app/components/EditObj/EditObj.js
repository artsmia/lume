import React, {Component} from 'react'
import styled from 'styled-components'
import {H2, H3} from '../../ui/h'
import {Label, Select, Option, Checkbox} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import AppObj from '../AppObj'
import DetailEditor from '../DetailEditor'
import PropTypes from 'prop-types'
import Snackbar from '../../ui/Snackbar'
import {ExpanderContainer} from '../../ui/expander'
import ImageManager from '../ImageManager'
import Sorter from '../../ui/drag/Sorter'
import {Loading} from '../../ui/spinner'
import ObjSettingsEditor from '../ObjSettingsEditor'
import ObjBasicEditor from '../ObjBasicEditor'
import {Search} from '../../ui/search'
import {Link} from '../../ui/links'

export default class EditObj extends Component {

  static propTypes = {
    editObj: PropTypes.func,
    editOrCreateDetail: PropTypes.func,
    data: PropTypes.object
  }


  state = {
    upload: true,
    snack: "",
    snackId: "",
    deleteObjModal: false,
    pullFromCustomApi: false,
    newRelatedThematicIds: [],
    removeRelatedThematicIds: [],
    availableThematics: [],
    reordering: false,
    selectedTab: "edit",
    details: [],
    thematicSearch: ""
  }



  render() {


    if (
      this.props.data.loading ||
      !this.props.data.obj
    ) return <Loading/>

    const {
      addDetail,
      props: {
        data: {
          organization,
          obj: {
            mainImage,
            relatedThematics,
            details
          },
          thematics,
          refetch
        },
        orgSub,
        objId,
        editObj
      },
      state: {
        snack,
        snackId,
        reordering,
        selectedTab,
        thematicSearch
      },
      onImageSave,
      reorderDetails,
      handleChange,
    } = this
    let sortedDetails = details.slice().sort( (a,b) => a.index - b.index)


    let filteredThematics = thematics.filter( ({id}) => {
      let found = relatedThematics.find( thematic => thematic.id === id)
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
                  <ObjSettingsEditor
                    objId={objId}
                  />
                  <ObjBasicEditor
                    objId={objId}

                  />


                </Column>
                <Column>
                  <H2>
                    Main Image
                  </H2>
                  <ImageManager
                    orgSub={orgSub}
                    imageId={(mainImage) ? mainImage.id : ""}
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
                          name={"thematicSearch"}
                          value={thematicSearch}
                          onChange={handleChange}
                        />
                        <Button
                          onClick={()=>{
                            refetch({
                              thematicFilter: {
                                limit: 20,
                                order: {
                                  column: "updatedAt",
                                  direction: "DESC"
                                }
                              },
                              thematicSearch
                            })
                          }}
                        >
                          Search
                        </Button>
                      </Row>

                      <CheckContainer>
                        {relatedThematics.map( ({id, title}) => (
                          <CheckRow
                            key={id}
                          >
                            <Link
                              href={{
                                pathname: "/cms/edit/thematic",
                                query: {
                                  orgSub,
                                  thematicId: id
                                }
                              }}
                              as={`/${orgSub}/cms/thematic/${id}`}
                            >
                              {title}
                            </Link>
                            <Checkbox
                              checked
                              name={id}
                              onChange={()=>{
                                editObj({
                                  variables: {
                                    objId,
                                    removeRelatedThematicIds: [id]
                                  }
                                })
                              }}
                            />
                          </CheckRow>
                        ))}
                        {filteredThematics.map( ({id, title}) => (
                          <CheckRow
                            key={id}
                          >
                            <Link
                              href={{
                                pathname: "/cms/edit/thematic",
                                query: {
                                  orgSub,
                                  thematicId: id
                                }
                              }}
                              as={`/${orgSub}/cms/thematic/${id}`}
                            >
                              {title}
                            </Link>
                            <Checkbox
                              name={id}
                              onChange={()=>{
                                editObj({
                                  variables: {
                                    objId,
                                    newRelatedThematicIds: [id]
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
                <AppObj
                  objId={objId}
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
    if (!data.loading && data.obj) {
      Object.keys(data.obj).forEach( key => {
        if (!Array.isArray(data.obj[key])) {
          this.setState({
            [key]: (data.obj[key] === null) ? "" : data.obj[key]
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
          editObj,
          data: {
            obj: {
              id: objId
            }
          }
        }

      } = this
      await editObj({
        variables: {
          objId,
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
          obj: {
            id: objId,
            mainImage
          }
        },
        editObj
      } = this.props

      await editObj({
        variables: {
          objId: objId,
          createDetailObjId: objId,
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
