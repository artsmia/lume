import {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import ImagePicker from './ImagePicker'
import Dropzone from '../../ui/Dropzone'
import styled from 'styled-components'
import Image from '../Image'
import {PropTypes} from 'prop-types'
import apiFile from '../../utils/apiFile'
import Snackbar from '../../ui/Snackbar'

export default class extends Component {

  static propTypes = {
    orgId: PropTypes.string.isRequired,
    imageId: PropTypes.string,
    onImageSave: PropTypes.func,
  }


  state = {
    snackMessage: "",
    snackId: ""
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
        snackId
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
          initialTab={"current"}
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
              <Image
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


      await apiFile(file,orgId)

      this.setState({
        snackMessage: "Image Uploaded",
        snackId: Math.random()
      })

      await refetch()

    } catch (ex) {
      console.error(ex)
    }
  }

}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 600px;
`
