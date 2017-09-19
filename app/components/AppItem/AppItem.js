import React, {Component} from 'react'
import styled from 'styled-components'
import {H1, H3, H4} from '../../ui/h'
import {TabContainer, TabHeader, Tab, TabBody} from '../../ui/tabs'
import Zoomer from '../Zoomer'
import AppDetail from '../AppDetail'
import Image from '../Image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {validateUuid} from '../../utils/validators'
import {Loading} from '../../ui/spinner'

export default class extends Component {

  static displayName = "AppItem"

  static propTypes = {
    itemId: PropTypes.string,
    data: PropTypes.shape({
      loading: PropTypes.bool
    }),
    orgSub: PropTypes.string
  }

  state = {
    selectedDetail: false,
    selectedClip: false
  }

  render() {
    if (this.props.data.loading) return <Loading/>

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
      <Container>
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
      </Container>
    )
  }

  handleDetailSelection = (selectedDetail) => {
    this.setState({selectedDetail})
  }

  handleClipSelection = (selectedClip) => {
    this.setState({selectedClip})
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
