import React, {Component} from 'react'
import Template from '../CMSTemplate'
import {EditContainer} from '../CMSTemplate/Template'
import {H2} from '../../ui/h'
import {Form, Label, Input, TextArea} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import ImageModule from '../../ui/ImageModule'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import {PreviewAppItem} from '../AppItem'
import DetailEditor from '../DetailEditor'
import PropTypes from 'prop-types'
import Snackbar from '../../ui/Snackbar'
import {ExpanderContainer} from '../../ui/expander'


export default class EditItem extends Component {

  static propTypes = {
    editItem: PropTypes.func,
    editOrCreateDetail: PropTypes.func,
    data: PropTypes.object
  }

  inputs = ["title", "localId", "medium", "artist", "dated", "accessionNumber", "currentLocation", "creditLine", "text"]

  state = {
    upload: true,
    snack: ""
  }

  constructor(props){
    super(props)
    this.inputs.forEach( name => {
      this.state = {
        ...this.state,
        [name]: ""
      }
    })
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
          organization,
          organization: {
            images
          },
          item,
          item: {
            mainImage,
            details
          }
        }
      },
      state: {
        snack,
        selectedImageId
      },
      onImageSelection,
      refreshQuery
    } = this
    return (
      <Template
        {...this.props}
      >
        <Snackbar
          message={snack}
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
                  <H2>
                    Information
                  </H2>

                  <Form>
                    {inputs.map( name => (
                      <Column
                        key={name}
                      >
                        <Label>
                          {name}
                        </Label>
                        {(name === "text") ? (
                          <TextArea
                            name={name}
                            onChange={change}
                            value={state[name]}
                          />
                        ): (
                          <Input
                            name={name}
                            onChange={change}
                            value={state[name]}
                          />
                        )}
                      </Column>
                    ))}
                  </Form>
                  <Button
                    onClick={saveItem}
                  >
                    Save Item
                  </Button>
                </Column>
                <Column>
                  <H2>
                    Item Main Image
                  </H2>
                  <ImageModule
                    orgId={organization.id}
                    images={images}
                    onImageSelection={onImageSelection}
                    currentImageId={(mainImage) ? mainImage.id : false}
                    onImageSave={saveItem}
                    onImageUploaded={refreshQuery}
                    selectedImageId={selectedImageId}
                  />
                </Column>
              </Row>
              <Column>
                <ExpanderContainer>
                  { (details) ?
                    details.map( detail => (
                      <DetailEditor
                        key={detail.id}
                        detailId={detail.id}
                      />
                    ))
                    : null
                  }
                </ExpanderContainer>
                <Button
                  onClick={addDetail}
                >
                  Add Detail
                </Button>              
              </Column>

            </TabBody>
            <TabBody
              name={"preview"}
            >
              <PreviewAppItem
                data={{
                  loading: false,
                  organization,
                  item: {
                    ...state,
                    mainImage: {
                      id: (mainImage) ? mainImage.id : false
                    }
                  }
                }}
              />
            </TabBody>
          </TabContainer>
        </EditContainer>
      </Template>
    )
  }

  componentWillReceiveProps(newProps){
    if (!newProps.data.loading) {
      this.inputs.forEach( name => {
        this.setState({
          [name]: newProps.data.item[name] || ""
        })
      })
    }
  }


  change = ({target: {name, value}}) => this.setState({[name]: value})

  onImageSelection = (selectedImageId) => {
    this.setState({selectedImageId})
  }

  saveItem = async () => {
    try {
      const {
        state: {
          artist,
          title,
          localId,
          medium,
          dated,
          accessionNumber,
          currentLocation,
          creditLine,
          text,
          selectedImageId
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
          artist,
          title,
          localId,
          medium,
          dated,
          accessionNumber,
          currentLocation,
          creditLine,
          text,
          mainImageId: selectedImageId
        }
      })

      this.setState({snack: "Saved!"})

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

  refreshQuery = async () => {
    try {
      this.props.data.refetch()
      this.setState({snack: "Uploaded!"})

    } catch (ex) {
      console.error(ex)
    }
  }

}
