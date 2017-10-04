import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../Template'
import {H2} from '../../ui/h'
import {Form, Label, Input, TextArea, Select, Option} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import AppItem from '../AppItem'
import PropTypes from 'prop-types'
import Snackbar from '../../ui/Snackbar'
import {ExpanderContainer} from '../../ui/expander'
import ImageManager from '../ImageManager'
import Modal from '../../ui/modal'
import router from 'next/router'
import PageEditor from '../PageEditor'
import AppBook from '../AppBook'
import Sorter from '../../ui/drag/Sorter'

export default class EditBook extends Component {

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
    currentLocation: "",
    selectedPage: [],
    pages: [],
    selectedTab: "edit"
  }



  render() {


    if (this.props.data.loading) return null

    const {
      addPage,
      deleteBook,
      change,
      saveBook,
      props: {
        data: {
          organization: {
            id: orgId,
          },
          book: {
            id: bookId,
            previewImage,
          }
        }
      },
      state: {
        snack,
        snackId,
        deleteBookModal,
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
                          onClick={saveBook}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={()=>this.setState({deleteBookModal: true})}
                          color={"red"}
                        >
                          Delete this Book
                        </Button>
                        <Modal
                          open={deleteBookModal}
                          onClose={()=>this.setState({deleteBookModal: false})}
                          footer={(
                            <Button
                              onClick={deleteBook}
                              color={"red"}
                            >
                              Delete Book
                            </Button>
                          )}
                        >
                          Do you want to delete this book?
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
                    orgId={orgId}
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
              <AppBook
                bookId={bookId}
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
      Object.keys(data.book).forEach( key => {

        this.setState({
          [key]: data.book[key] || ""
        })

        if (key === "pages") {
          let pages = data.book.pages.slice()
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
            book: {
              id: bookId
            }
          },
          editBook
        },
      } = this
      await editBook({
        variables: {
          bookId,
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

  saveBook = async () => {
    try {
      const {
        state: {
          title
        },
        props: {
          data: {
            book: {
              id: bookId
            }
          },
          editBook
        },
      } = this

      await editBook({
        variables: {
          bookId,
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
          book: {
            id: bookId,
          }
        },
        editBook
      } = this.props


      await editBook({
        variables: {
          bookId,
          createPageBookId: bookId,
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


  deleteBook = async () => {
    try {

      const {
        props: {
          deleteBook,
          bookId,
          orgSub
        }
      } = this

      await deleteBook({
        variables: {
          bookId
        }
      })


      router.push({
        pathname: '/cms/browse/books',
        query: {
          orgSub,
        }
      }, `/${orgSub}/cms/books`)


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
  padding: 10px;
  border: 1px solid ${({theme}) => theme.colors.black};
`
