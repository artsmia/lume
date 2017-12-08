import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../../shared/Template'
import {H2} from '../../ui/h'
import {Label, Input} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import PropTypes from 'prop-types'
import Snackbar from '../../ui/Snackbar'
import {ExpanderContainer} from '../../ui/expander'
import ImageManager from '../ImageManager'
import Modal from '../../ui/modal'
import router from 'next/router'
import PageEditor from '../PageEditor'
import PreviewThematic from '../../lume/Thematic'
import Sorter from '../../ui/drag/Sorter'

export default class EditThematic extends Component {

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
    title: "",
    attribution: "",
    medium: "",
    dimensions: "",
    culture: "",
    accessionNumber: "",
    text: "",
    creditLine: "",
    currentLocation: "",
    selectedPage: [],
    pages: [],
    selectedTab: "edit"
  }



  render() {


    if (this.props.data.loading) return null

    const {
      addPage,
      deleteThematic,
      change,
      saveThematic,
      props: {
        data: {
          organization: {
            id: orgId,
          },
          thematic: {
            id: thematicId,
            previewImage,
          }
        },
        subdomain
      },
      state: {
        snack,
        snackId,
        deleteThematicModal,
        title,
        pages,
        selectedTab,
        reordering,
      },
      onImageSave,
      reorderPages
    } = this

    let sortedPages = pages.slice().sort( (a,b) => a.index - b.index)

    return (
      <Template
        drawer
        {...this.props}
      >
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
                onClick={()=>this.setState({selectedTab:"edit"})}
              >
                Edit
              </Tab>
              <Tab
                name={"preview"}
                onClick={()=>this.setState({selectedTab:"preview"})}
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
                        </Column>
                      </Row>
                      <Row>
                        <Button
                          onClick={saveThematic}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={()=>this.setState({deleteThematicModal: true})}
                          color={"red"}
                        >
                          Delete this Thematic
                        </Button>
                        <Modal
                          open={deleteThematicModal}
                          onClose={()=>this.setState({deleteThematicModal: false})}
                          footer={(
                            <Button
                              onClick={deleteThematic}
                              color={"red"}
                            >
                              Delete Thematic
                            </Button>
                          )}
                        >
                          Do you want to delete this thematic?
                        </Modal>
                      </Row>
                    </SectionContainer>
                  </Row>


                </Column>
                <Column>
                  <H2>
                    Preview Image
                  </H2>
                  <ImageManager
                    subdomain={subdomain}
                    imageId={(previewImage) ? previewImage.id : undefined}
                    onImageSave={onImageSave}
                  />
                </Column>
              </Row>
              <Row>
                <SectionContainer>
                  <H2>
                    Pages
                  </H2>
                  <Button
                    onClick={()=>this.setState(({reordering}) => ({reordering: !reordering}))}
                  >
                    {(reordering) ? "Done" : "Reorder Pages"}
                  </Button>

                  <ExpanderContainer>
                    { (sortedPages && !reordering) ?
                      pages.map( page => (
                        <PageEditor
                          key={page.id}
                          pageId={page.id}
                          orgId={orgId}
                          subdomain={subdomain}
                        />
                      ))
                      : null
                    }
                    {
                      (sortedPages && reordering) ? (
                        <Sorter
                          sortables={sortedPages}
                          onNewOrder={reorderPages}
                        />
                      ): null
                    }

                    <Button
                      onClick={addPage}
                      color={"white"}
                    >
                      Add Page
                    </Button>
                  </ExpanderContainer>

                </SectionContainer>
              </Row>


            </TabBody>
            <TabBody
              name={"preview"}
            >
              <PreviewThematic
                thematicId={thematicId}
                orgId={orgId}
              />
            </TabBody>
          </TabContainer>
        </EditContainer>
      </Template>
    )
  }

  componentWillReceiveProps({data}){
    if (!data.loading) {
      Object.keys(data.thematic).forEach( key => {

        this.setState({
          [key]: data.thematic[key] || ""
        })

        if (key === "pages") {
          let pages = data.thematic.pages.slice()
          pages.sort(
            (a,b) => {
              return a.index - b.index
            }
          )
          this.setState({
            pages
          })
        }
      })
    }
  }


  change = ({target: {name, value}}) => this.setState({[name]: value})


  onImageSave = async (selectedImageId) => {
    try {
      const {
        props: {
          data: {
            thematic: {
              id: thematicId
            }
          },
          editThematic
        },
      } = this
      await editThematic({
        variables: {
          thematicId,
          previewImageId: selectedImageId
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

  saveThematic = async () => {
    try {
      const {
        state: {
          title
        },
        props: {
          data: {
            thematic: {
              id: thematicId
            }
          },
          editThematic
        },
      } = this

      await editThematic({
        variables: {
          thematicId,
          title
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

  addPage = async () => {
    try {
      const {
        data: {
          thematic: {
            id: thematicId,
          }
        },
        editThematic
      } = this.props


      await editThematic({
        variables: {
          thematicId,
          createPageThematicId: thematicId,
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }


  reorderPages = async (pages) => {
    try {
      const {
        editPage
      } = this.props

      await Promise.all(
        pages.map(page => editPage({
          variables: {
            pageId: page.id,
            index: page.index
          }
        }))
      )
    } catch (ex) {
      console.error(ex)
    }
  }


  deleteThematic = async () => {
    try {

      const {
        props: {
          deleteThematic,
          thematicId,
          subdomain
        }
      } = this

      await deleteThematic({
        variables: {
          thematicId
        }
      })


      router.push({
        pathname: '/cms/browse/thematics',
        query: {
          subdomain,
        }
      }, `/${subdomain}/cms/thematics`)


    } catch (ex) {
      console.error(ex)
    }
  }

}


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
