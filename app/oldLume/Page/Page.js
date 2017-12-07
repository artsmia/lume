import React, {Component} from 'react'
import styled from 'styled-components'
import {H3} from '../../ui/h'
import Zoomer from '../../shared/Zoomer'
import {Row} from '../../ui/layout'
import {Vimeo} from '../../ui/video'
import PropTypes from 'prop-types'

export default class Page extends Component {

  static displayName = "Page"

  static propTypes = {
    pageId: PropTypes.string.isRequired,
    data: PropTypes.object,
  }

  render() {

    if (this.props.data.loading) return <PageContainer/>

    const {
      props: {
        data: {
          page: {
            title,
            type,
            text,
            mainImage,
            comparisonImage0,
            comparisonImage1,
            video
          }
        }
      },
    } = this

    return (
      <PageContainer>
        <FeatureContainer>
          {(mainImage && type === "image") ? (
            <Zoomer
              imageId={mainImage.id}
            />
          ): null}
          {(video && type === "video") ? (
            <Vimeo
              url={video}
            />
          ): null}
          {(type === "comparison" && comparisonImage0 && comparisonImage1) ? (
            <Row>
              <Zoomer
                imageId={comparisonImage0.id}
              />
              <Zoomer
                imageId={comparisonImage1.id}
              />
            </Row>
          ): null}
        </FeatureContainer>
        <SideContainer>
          <H3>{title}</H3>
          <TextContainer
            dangerouslySetInnerHTML={{__html: text}}
          />
        </SideContainer>
      </PageContainer>
    )
  }


}


const TextContainer = styled.div`
`

const PageContainer = styled.div`
  display: flex;
  height: 100%;
`

const SideContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
`

const FeatureContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
`
