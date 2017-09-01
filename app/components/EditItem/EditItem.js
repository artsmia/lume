import React, {Component} from 'react'
import Template from '../CMSTemplate'
import {EditContainer} from '../CMSTemplate/Template'
import {H2} from '../../ui/h'
import {Form, Label, Input, TextArea} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
// import ImageModule from '../../ui/ImageModule'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import {PreviewAppItem} from '../AppItem'
import DetailEditor from '../DetailEditor'
import PropTypes from 'prop-types'
import Snackbar from '../../ui/Snackbar'
import {ExpanderContainer} from '../../ui/expander'
import ImageManager from '../ImageManager'

export default class EditItem extends Component {

  static propTypes = {
    editItem: PropTypes.func,
    editOrCreateDetail: PropTypes.func,
    data: PropTypes.object
  }

  inputs = ["title", "localId", "medium", "artist", "dated", "accessionNumber", "currentLocation", "creditLine", "text"]

  state = {
    upload: true,
    snack: "",
    snackId: ""
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
            id: orgId,
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
        snackId,
      },
      onImageSelection,
      onImageSave
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
                  <ImageManager
                    orgId={orgId}
                    imageId={(mainImage) ? mainImage.id : undefined}
                    onImageSave={onImageSave}
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
                        orgId={orgId}
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
          artist,
          title,
          localId,
          medium,
          dated,
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
          artist,
          title,
          localId,
          medium,
          dated,
          accessionNumber,
          currentLocation,
          creditLine,
          text,
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


}
