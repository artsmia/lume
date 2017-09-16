import React, {Component} from 'react'
import styled from 'styled-components'
import Template from '../Template/Template'
import {H1, H2, H3, H4} from '../../ui/h'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import Zoomer from '../Zoomer'
import {ExpanderContainer, Expander} from '../../ui/expander'
import AppDetail from '../AppDetail'
import Image from '../Image'
import Link from 'next/link'

export default class extends Component {

  state = {
    selectedDetail: false,
    selectedClip: false
  }

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
            details,
            relatedBooks
          }
        },
        orgSub
      },
      state: {
        selectedDetail,
        selectedClip
      },
      handleDetailSelection,
      handleClipSelection
    } = this
    return (
      <Template
        drawer={false}
      >
        <SideContainer>
          <H1>{title}</H1>
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
              name={"details"}
            >
              {details.map(detail => (
                <AppDetail
                  key={detail.id}
                  detailId={detail.id}
                  onDetailSelection={handleDetailSelection}
                  selected={(detail.id === selectedDetail.id)}
                  handleClipSelection={handleClipSelection}
                  selectedClip={selectedClip}
                />
              ))}
            </TabBody>
            <TabBody
              name={"more"}
            >
              <H3>
                Related Books
              </H3>
              {
                relatedBooks.map(({id: bookId, title, previewImage}) => (
                  <Link
                    key={bookId}
                    href={{
                      pathname: '/app/book',
                      query: {
                        bookId,
                        orgSub
                      }
                    }}
                    as={`/${orgSub}/book/${bookId}`}
                  >
                    <RelatedContainer>
                      <H4>
                        {title}
                      </H4>
                      {(previewImage) ? (
                        <Image
                          imageId={previewImage.id}
                          thumb
                        />
                      ): null}
                    </RelatedContainer>
                  </Link>
                ))
              }
            </TabBody>
          </TabContainer>
        </SideContainer>
        <FeatureContainer>
          {(mainImage && !selectedDetail) ? (
            <Zoomer
              imageId={mainImage.id}
            />
          ): null}
          {(selectedDetail && selectedDetail.image) ? (
            <Zoomer
              detailId={selectedDetail.id}
              clipId={selectedClip.id}
            />
          ): null}
        </FeatureContainer>
      </Template>
    )
  }

  handleDetailSelection = (selectedDetail) => {
    this.setState({selectedDetail})
  }

  handleClipSelection = (selectedClip) => {
    this.setState({selectedClip})
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

const RelatedContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors.black};
  display: flex;
  align-items: center;
  margin: 15px 10px;
  box-sizing: border-box;
  padding: 10px;
  justify-content: space-between;
  cursor: pointer;
`
