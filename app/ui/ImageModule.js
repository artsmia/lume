import react, {Component} from 'react'
import {TabContainer, TabHeader, Tab, TabBody} from './tabs'
import ImagePicker from './ImagePicker'
import Dropzone from './Dropzone'
import {LargeImage} from './images'

export default class extends Component {


  render() {
    const {
      props: {
        organization,
        images,
        onImageSelection,
        initialImageId
      }
    } = this
    return (
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
          <LargeImage
            src={`https://s3.amazonaws.com/${organization.id}/${initialImageId}`}
          />
        </TabBody>
        <TabBody
          name={"choose"}
        >
          <ImagePicker
            organization={organization}
            images={images}
            onImageSelection={onImageSelection}
            initialImageId={initialImageId}
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
    )
  }
}
