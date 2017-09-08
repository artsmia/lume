import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../Template/Template'
import {H2, H3} from '../../ui/h'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import Zoomer from '../Zoomer'
import {ExpanderContainer, Expander} from '../../ui/expander'

export default class extends Component {


  render() {
    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          item: {
            title,
            attribution,
            mainImage,
            text,
            details
          }
        }
      }
    } = this

    return (
      <Template
        drawer={false}
      >
        <SideContainer>
          <H2>{title}</H2>
          <H3>{attribution}</H3>
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
              <ExpanderContainer>
                {
                  details.map( detail => (
                    <Expander
                      key={detail.id}
                      header={detail.title}
                    >
                      <ExpanderContainer>
                        {
                          detail.clips.map( clip => (
                            <Expander
                              key={clip.id}
                              header={clip.title}
                            >
                              {clip.description}
                            </Expander>
                          ))
                        }
                      </ExpanderContainer>
                    </Expander>
                  ))
                }
              </ExpanderContainer>
            </TabBody>
          </TabContainer>
        </SideContainer>
        <FeatureContainer>
          <Zoomer
            imageId={mainImage.id}
          />


        </FeatureContainer>
      </Template>
    )
  }


}


const SideContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const FeatureContainer = styled.div`
  width: 70%;
  display: flex;
`
