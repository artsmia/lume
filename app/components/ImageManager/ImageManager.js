import {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import ImagePicker from './ImagePicker'
import Dropzone from '../../ui/Dropzone'
import styled from 'styled-components'
import Image from '../Image'
import {PropTypes} from 'prop-types'
import apiFile from '../../utils/apiFile'
import Snackbar from '../../ui/Snackbar'
import Zoomer from '../Zoomer'

export default class extends Component {

  static propTypes = {
    orgId: PropTypes.string.isRequired,
    imageId: PropTypes.string,
    onImageSave: PropTypes.func,
  }


  state = {
    snackMessage: "",
    snackId: "",
    uploading: false,
    selectedTab: "current"
  }

  render() {

    if (this.props.data.loading) return null

    const {
      props: {
        imageId,
        onImageSave,
        orgId,
        data: {
          organization: {
            images
          }
        },
      },
      state: {
        snackMessage,
        snackId,
        uploading
      },
      onImageUpload,
    } = this
    return (
      <Container>
        <Snackbar
          message={snackMessage}
          snackId={snackId}
        />
        <TabContainer
          selectedTab={"current"}
        >
          <TabHeader>
            <Tab
              name={"current"}
            >
              Current
            </Tab>
            <Tab
              name={"select"}
            >
              Select
            </Tab>
            <Tab
              name={"upload"}
            >
              Upload
            </Tab>
          </TabHeader>
          <TabBody
            name={"current"}
          >
            {(imageId) ? (
              <Zoomer
                imageId={imageId}
              />
            ) : <p>Select an image or upload a new one</p>}
          </TabBody>
          <TabBody
            name={"select"}
          >
            <ImagePicker
              images={images}
              imageId={imageId}
              onImageSave={onImageSave}
            />
          </TabBody>
          <TabBody
            name={"upload"}
          >
            <Dropzone
              orgId={orgId}
              onImageUpload={onImageUpload}
              uploading={uploading}
            />
          </TabBody>
        </TabContainer>
      </Container>
    )
  }

  onImageUpload = async (file) => {
    try {
      const {
        data: {
          refetch
        },
        orgId
      } = this.props

      await this.promiseState({uploading: true})

      await apiFile(file,orgId)

      await this.promiseState({uploading: false})

      this.setState({
        snackMessage: "Image Uploaded",
        snackId: Math.random()
      })

      await refetch()

    } catch (ex) {
      console.error(ex)
    }
  }

  promiseState = (newState) => {
    return new Promise( (resolve, reject) => {
      this.setState(
        newState,
        resolve
      )
    })
  }

}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
`
