import React, {Component} from 'react'
import AppTemplate from '../AppTemplate/Template'
import {SideContainer, FeatureContainer} from '../AppTemplate/Template'
import {LargeImage} from '../../ui/images'
import {H2, H3} from '../../ui/h'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import {s3Url} from '../../config'
import Zoomer from '../../ui/zoomer/Zoomer'

export default class extends Component {


  render() {
    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          item: {
            title,
            artist,
            mainImage,
            text
          },
          organization
        }
      }
    } = this
    return (
      <AppTemplate>
        <SideContainer>
          <H2>{title}</H2>
          <H3>{artist}</H3>
          <TabContainer
            initialTab={"about"}
          >
            <TabHeader>
              <Tab
                name={"about"}
              >
                About
              </Tab>
              <Tab
                name={"details"}
              >
                Details
              </Tab>
              <Tab
                name={"more"}
              >
                More
              </Tab>
            </TabHeader>
            <TabBody
              name={"about"}
            >
              <p>{text}</p>
            </TabBody>
            <TabBody
              name={"more"}
            >
              more
            </TabBody>
            <TabBody
              name={"details"}
            >
              details
            </TabBody>
          </TabContainer>
        </SideContainer>
        <FeatureContainer>
          {/* <Zoomer
            organizationId={organization.id}
            imageId={mainImage.id}
          /> */}
          <LargeImage
            src={`${s3Url}/${organization.id}/${mainImage.id}/original`}
          />
        </FeatureContainer>
      </AppTemplate>
    )
  }


}
