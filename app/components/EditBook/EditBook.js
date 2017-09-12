import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../Template'
import {H2} from '../../ui/h'
import {Form, Label, Input, TextArea} from '../../ui/forms'
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
    currentLocation: ""
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
            pages
          }
        }
      },
      state: {
        snack,
        snackId,
        deleteItemModal,
        title,
      },
      onImageSave,
    } = this
    console.log(this.props)
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
                          open={deleteItemModal}
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
                  <ExpanderContainer>
                    { (pages) ?
                      pages.map( page => (
                        <PageEditor
                          key={page.id}
                          pageId={page.id}
                          orgId={orgId}
                        />
                      ))
                      : null
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
              {/* <AppItem
                itemId={itemId}
              /> */}
            </TabBody>
          </TabContainer>
        </EditContainer>
      </Template>
    )
  }

  componentWillReceiveProps(newProps){
    if (!newProps.data.loading) {
      Object.keys(newProps.data.book).forEach( key => {
        this.setState({
          [key]: newProps.data.book[key] || ""
        })
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


      const data = await editBook({
        variables: {
          bookId,
          createPageBookId: bookId,
        }
      })


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
