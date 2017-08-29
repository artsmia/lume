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
import DetailEditor from '../DetailEditor/DetailEditor'
import PropTypes from 'prop-types'
import Snackbar from '../../ui/Snackbar'

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
        mainImageId,
        snack
      },
      onImageSelection,
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
                    initialImageId={mainImageId}
                  />
                </Column>
              </Row>

              <Column>
                { (details) ?
                  details.map( detail => (
                    <DetailEditor
                      key={detail.id}
                      detail={detail}
                    />
                  ))
                  : null
                }
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
                      id: mainImageId
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

    const {
      mainImage
    } = newProps.data.item
    this.inputs.forEach( name => {
      this.setState({
        [name]: newProps.data.item[name] || ""
      })
    })
    if (mainImage) {
      this.setState({mainImageId: mainImage.id})
    } else {
      this.setState({mainImageId: ""})
    }
  }


  change = ({target: {name, value}}) => this.setState({[name]: value})

  onImageSelection = (selectedImageId) => {
    this.setState({mainImageId: selectedImageId})
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
          mainImageId
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
          mainImageId
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
        props: {
          data: {
            item: {
              id: itemId,
              mainImage: {
                id: imageId
              }
            }
          },
          editOrCreateDetail
        },
      } = this

      await editOrCreateDetail({
        variables: {
          itemId,
          imageId
        }
      })

    } catch (ex) {
      console.error(ex)
    }
  }

}
