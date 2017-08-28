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
        organization,
        images,
        onImageSelection,
        mainImageId
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
            {(mainImageId) ? (
              <LargeImage
                src={`${s3Url}/${organization.id}/${mainImageId}/m`}
              />
            ) : null}
          </TabBody>
          <TabBody
            name={"choose"}
          >
            <ImagePicker
              organization={organization}
              images={images}
              onImageSelection={onImageSelection}
              mainImageId={mainImageId}
            />
          </TabBody>
          <TabBody
            name={"upload"}
          >
            <Dropzone
              organization={organization}
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
