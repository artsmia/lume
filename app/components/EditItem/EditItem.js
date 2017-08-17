import React, {Component} from 'react'
import Template from '../CMSTemplate'
import {EditContainer, EditTabContainer} from '../CMSTemplate/Template'
import {H2} from '../../ui/h'
import {Tab} from '../../ui/buttons'
import {Form, Label, Input} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import Dropzone from '../Dropzone'
import ImagePicker from '../ImagePicker/ImagePicker'

export default class EditItem extends Component {

  inputs = ["title", "localId", "medium", "artist", "dated", "accessionNumber", "currentLocation", "creditLine", "text"]

  state = {
    upload: true
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
          item: {
            mainImage
          }
        }
      },
      state: {
        upload
      },
      toggleUpload,
      onImageSelection
    } = this
    return (
      <Template
        {...this.props}
      >
        <EditTabContainer>
          <Tab>
            Edit
          </Tab>
          <Tab>
            Preview
          </Tab>
        </EditTabContainer>
        <EditContainer>
          <Row>
            <Column>
              <Form>
                {inputs.map( name => (
                  <Column
                    key={name}
                  >
                    <Label>
                      {name}
                    </Label>
                    <Input
                      name={name}
                      onChange={change}
                      value={state[name]}
                    />
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
              <Button
                onClick={toggleUpload}
              >
                {(upload) ? "Upload" : "Choose"}
              </Button>
              {(upload) ? (
                <ImagePicker
                  organization={organization}
                  images={images}
                  onImageSelection={onImageSelection}
                  initialImageId={mainImage.id}
                />
              ) : (
                <Dropzone
                  orgId={organization.id}
                />
              )}
            </Column>
          </Row>

        </EditContainer>
      </Template>
    )
  }

  componentWillReceiveProps(newProps){
    this.inputs.forEach( name => {
      this.setState({
        [name]: newProps.data.item[name] || ""
      })
    })
  }

  toggleUpload = () => this.setState( ({upload}) => ({upload: !upload}))

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
          }
        }
      } = this

      const response = await this.props.editItem({
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


    } catch (ex) {
      console.error(ex)
    }
  }

}
