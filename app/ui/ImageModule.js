import react, {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from './tabs'
import ImagePicker from './ImagePicker'
import Dropzone from './Dropzone'
import {LargeImage} from './images'
import {s3Url} from '../config'
import styled from 'styled-components'

export default class extends Component {


  render() {
    const {
      props: {
        orgId,
        images,
        onImageSelection,
        initialImageId
      }
    } = this
    return (
      <Container>
        <TabContainer
          initialTab={"current"}
        >
          <TabHeader>
            <Tab
              name={"current"}
            >
              Current Image
            </Tab>
            <Tab
              name={"choose"}
            >
              Choose Image
            </Tab>
            <Tab
              name={"upload"}
            >
              Upload New Image
            </Tab>
          </TabHeader>
          <TabBody
            name={"current"}
          >
            {(initialImageId) ? (
              <LargeImage
                src={`${s3Url}/${orgId}/${initialImageId}/m`}
              />
            ) : null}
          </TabBody>
          <TabBody
            name={"choose"}
          >
            <ImagePicker
              orgId={orgId}
              images={images}
              onImageSelection={onImageSelection}
              initialImageId={initialImageId}
            />
          </TabBody>
          <TabBody
            name={"upload"}
          >
            <Dropzone
              orgId={orgId}
              onImageSelection={onImageSelection}
            />
          </TabBody>
        </TabContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 600px;
`
