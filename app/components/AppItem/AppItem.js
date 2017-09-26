import React, {Component} from 'react'
import styled from 'styled-components'
import {H3, H4} from '../../ui/h'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import Zoomer from '../Zoomer'
import AppDetail from '../AppDetail'
import Image from '../Image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {Loading} from '../../ui/spinner'
import AppTombstone from '../AppTombstone'

export default class extends Component {

  static displayName = "AppItem"

  static propTypes = {
    itemId: PropTypes.string.isRequired,
    data: PropTypes.object,
    orgSub: PropTypes.string.isRequired
  }

  state = {
    selectedDetail: false,
    selectedTab: "about"
  }

  render() {
    if (this.props.data.loading) return <Loading/>

    const {
      props: {
        data: {
          item: {
            id: itemId,
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
        selectedTab
      },
      handleDetailSelection,
    } = this

    let sortedDetails = details.slice().sort((a,b) => a.index - b.index)
    return (
      <Container>
        <SideContainer>
          <AppTombstone
            itemId={itemId}
          />
          <TabContainer
            selectedTab={selectedTab}
          >
            <TabHeader>
              <Tab
                name={"about"}
                onClick={()=>this.setState({selectedTab: "about"})}
              >
                About
              </Tab>
              <Tab
                name={"details"}
                onClick={()=>this.setState({
                  selectedTab: "details",
                  selectedDetail: (sortedDetails.length > 0) ? sortedDetails[0] : false
                })}
              >
                Details
              </Tab>
              <Tab
                name={"more"}
                onClick={()=>this.setState({selectedTab: "more"})}
              >
                More
              </Tab>
            </TabHeader>
            <TabBody
              name={"about"}
            >
              <AboutText>{text}</AboutText>
            </TabBody>
            <TabBody
              name={"details"}
            >
              {(selectedTab === "details") ? sortedDetails.map(detail => (
                <AppDetail
                  key={detail.id}
                  detailId={detail.id}
                  onDetailSelection={handleDetailSelection}
                  selected={(detail.id === selectedDetail.id)}
                />
              )): null}
            </TabBody>
            <TabBody
              name={"more"}
            >
              <MoreContainer>
                <H3>
                  Related Books
                </H3>
                {relatedBooks.map(({id: bookId, title, previewImage}) => (
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
                ))}
              </MoreContainer>

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
            />
          ): null}
        </FeatureContainer>
      </Container>
    )
  }

  handleDetailSelection = (selectedDetail) => {
    this.setState({selectedDetail})
  }



}
const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  min-height: 100vh;
`


const SideContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
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

const AboutText = styled.p`
  margin: 15px;
`

const MoreContainer = styled.div`
  margin: 15px;
`
