import {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import ImagePicker from './ImagePicker'
import ImageUploader from './ImageUploader'
import GdriveImageUploader from './GdriveImageUploader'
import styled from 'styled-components'
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
    snackId: "",
    uploading: false,
    selectedTab: "upload"
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
        uploading,
        selectedTab
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
          selectedTab={selectedTab}
        >
          <TabHeader>
            <Tab
              name={"select"}
              onClick={()=>this.setState({selectedTab: "select"})}
            >
              Select
            </Tab>
            <Tab
              name={"upload"}
              onClick={()=>this.setState({selectedTab: "upload"})}
            >
              Upload
            </Tab>
          </TabHeader>

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
            <GdriveImageUploader

            />
            {/* <ImageUploader
              onImageUpload={onImageUpload}
              uploading={uploading}
            /> */}
          </TabBody>
        </TabContainer>
      </Container>
    )
  }

  componentDidMount(){
    if (this.props.data.organization.images.length < 1) {
      this.setState({selectedtab: "upload"})
    }
  }

  onImageUpload = async (file) => {
    try {
      const {
        data: {
          refetch
        },
        orgId,
        onImageSave
      } = this.props

      await this.promiseState({uploading: true})

      const {id: imageId} = await apiFile(file,orgId)
      onImageSave(imageId)

      this.setState({
        uploading: false,
        selectedTab: "select",
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
