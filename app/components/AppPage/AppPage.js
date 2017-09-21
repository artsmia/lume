import React, {Component} from 'react'
import styled from 'styled-components'
import {H3} from '../../ui/h'
import Zoomer from '../Zoomer'
import {Row} from '../../ui/layout'
import {Vimeo} from '../../ui/video'
import PropTypes from 'prop-types'

export default class AppPage extends Component {

  static displayName = "AppPage"

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
            comparisonImages,
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
          {(comparisonImages.length === 2 && type === "comparison") ? (
            <Row>
              <Zoomer
                imageId={comparisonImages[0].id}
              />
              <Zoomer
                imageId={comparisonImages[1].id}
              />
            </Row>
          ): null}
        </FeatureContainer>
        <SideContainer>
          <H3>{title}</H3>
          <p>{text}</p>
        </SideContainer>
      </PageContainer>
    )
  }


}


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
`

const FeatureContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
`
